import { Hash } from '@adonisjs/hash';
import { Scrypt } from '@adonisjs/hash/drivers/scrypt';
import { faker } from '@faker-js/faker';
import {
  $Enums,
  type Prisma,
  type PrismaClient,
  type User,
} from '~~/generated/prisma/client';

import { createStringIdentifier } from './identifiers';

const PASSWORD_DEFAULT_VALUE = 'password';

let _hash: Hash;
const getHash = () => {
  if (!_hash) {
    const scrypt = new Scrypt({});
    _hash = new Hash(scrypt);
  }
  return _hash;
};
const hashPassword = async (password: string) => {
  return await getHash().make(password);
};

const createUserData = async (arg: {
  email?: string;
  years?: number;
}): Promise<Prisma.UserCreateInput> => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email
    = arg.email
      ?? faker.internet
        .email({
          firstName,
          lastName,
        })
        .toLowerCase();
  const createdAt = faker.date.past({
    years: arg.years,
  });

  return {
    authAccesses: {
      create: {
        createdAt,
        id: createStringIdentifier(),
        password: await hashPassword(PASSWORD_DEFAULT_VALUE),
        provider: $Enums.AuthProvider.CREDENTIALS,
        updatedAt: createdAt,
      },
    },
    createdAt,
    email,
    firstName,
    lastName,
    updatedAt: createdAt,
  };
};

const USER_EMAIL_DEFAULT = 'adelie_reylah@hotmail.fr';

export const createUsers = async (arg: {
  prisma: PrismaClient;
  years: number;
}): Promise<User[]> => {
  const usersData: Prisma.UserCreateInput[] = [
    await createUserData({
      email: USER_EMAIL_DEFAULT,
      years: arg.years,
    }),
    ...(await Promise.all(
      faker.helpers.multiple(
        () => {
          return createUserData({
            years: arg.years,
          });
        },
        {
          count: {
            max: 15,
            min: 7,
          },
        },
      ),
    )),
  ];

  return Promise.all(
    usersData.map(userData =>
      arg.prisma.user.create({
        data: userData,
      }),
    ),
  );
};
