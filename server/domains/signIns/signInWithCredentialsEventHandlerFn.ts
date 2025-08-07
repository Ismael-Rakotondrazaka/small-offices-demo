import type { SignInWithCredentialsRequest } from '~~/shared';

import { AuthProvider } from '~~/generated/prisma/client';
import { RepositoryProvider } from '~~/server/services';
import { UserDTOMapper } from '~~/server/utils';

export const signInWithCredentialsEventHandlerFn: EventHandlerFn<
  SignInWithCredentialsRequest
> = async ({ body, userSession }) => {
  const user = await RepositoryProvider.userRepository.findOne({
    where: {
      email: body.email,
    },
  });
  if (!user) {
    throw Exception.unauthorized({
      data: {},
      message: 'auth.signIn.form.errors.credentials.notMatch',
    });
  }

  const authAccess = await RepositoryProvider.authAccessRepository.findOne({
    where: {
      provider: AuthProvider.CREDENTIALS,
      userId: user.id,
    },
  });
  if (!authAccess) {
    throw Exception.unauthorized({
      data: {},
      message: 'auth.signIn.form.errors.credentials.notMatch',
    });
  }

  const isPasswordValid = await verifyPassword(
    authAccess.password!,
    body.password,
  );
  if (!isPasswordValid) {
    throw Exception.unauthorized({
      data: {},
      message: 'auth.signIn.form.errors.credentials.notMatch',
    });
  }

  const userDTO = UserDTOMapper.toDTO(user);

  await userSession.replace({
    user: userDTO,
  });

  return {
    data: userDTO,
  };
};
