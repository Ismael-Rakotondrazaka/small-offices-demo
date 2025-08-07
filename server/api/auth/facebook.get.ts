import { AuthProvider } from '~~/generated/prisma/client';
import { IdentifierGenerator } from '~~/server/core';
import { RepositoryProvider } from '~~/server/services';

interface FacebookResult {
  user: FacebookUserData;
}

interface FacebookUserData {
  first_name: string;
  id: string;
  last_name: string;
}

export default defineOAuthFacebookEventHandler({
  config: {
    fields: ['id', 'first_name', 'last_name'],
  },
  // Optional, will return a json error and 401 status code by default
  onError: (event) => {
    return sendRedirect(event, '/sign-in');
  },
  onSuccess: async (event, { user: facebookUser }: FacebookResult) => {
    let user = await RepositoryProvider.userRepository.findOne({
      where: {
        authAccesses: {
          some: {
            provider: AuthProvider.FACEBOOK,
            providerId: facebookUser.id,
          },
        },
      },
    });

    if (!user) {
      user = await RepositoryProvider.userRepository.addOne({
        data: {
          authAccesses: {
            create: {
              provider: AuthProvider.FACEBOOK,
              providerId: facebookUser.id,
            },
          },
          firstName: facebookUser.first_name,
          id: IdentifierGenerator.generateUUIDV7(),
          lastName: facebookUser.last_name,
        },
      });
    }

    await replaceUserSession(event, {
      user: {
        firstName: user.firstName,
        id: user.id,
        lastName: user.lastName,
      },
    });

    return sendRedirect(event, '/chats');
  },
});
