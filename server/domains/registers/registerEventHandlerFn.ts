import type { RegisterRequest } from '~~/shared';

import { AuthProvider } from '~~/generated/prisma/client';
import { RepositoryProvider } from '~~/server/services';
import { UserDTOMapper } from '~~/server/utils';

export const registerEventHandlerFn: EventHandlerFn<RegisterRequest> = async ({
  body,
  userSession,
}) => {
  const isEmailAlreadyUsed = await RepositoryProvider.userRepository.existOne({
    where: {
      email: body.email,
    },
  });
  if (isEmailAlreadyUsed) {
    throw Exception.badRequest({
      data: {
        email: ['auth.register.form.errors.email.alreadyUsed'],
      },
      message: 'auth.register.form.errors.email.alreadyUsed',
    });
  }

  const user = await RepositoryProvider.userRepository.addOne({
    data: {
      authAccesses: {
        create: {
          password: await hashPassword(body.password),
          provider: AuthProvider.CREDENTIALS,
        },
      },
      email: body.email,
      firstName: body.firstName,
      lastName: body.lastName,
    },
  });

  const userDTO = UserDTOMapper.toDTO(user);

  await userSession.replace({
    user: userDTO,
  });

  return {
    data: userDTO,
  };
};
