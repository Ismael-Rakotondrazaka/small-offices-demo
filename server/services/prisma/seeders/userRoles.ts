import { faker } from '@faker-js/faker';

import {
  $Enums,
  type Prisma,
  type PrismaClient,
  type UserRole,
} from '../../../../generated/prisma/client';
import { createStringIdentifier } from './identifiers';

const createUserRoleData = (): Prisma.UserRoleCreateManyInput => {
  const role = faker.helpers.enumValue($Enums.Role);

  return {
    id: createStringIdentifier(),
    role,
  };
};

export const createUserRoles = async (arg: {
  count?: number;
  prisma: PrismaClient;
}): Promise<UserRole[]> => {
  const userRolesData: Prisma.UserRoleCreateManyInput[] = [];
  const count = arg.count || 5;

  for (let i = 0; i < count; i++) {
    userRolesData.push(createUserRoleData());
  }

  await arg.prisma.userRole.createMany({
    data: userRolesData,
    skipDuplicates: true,
  });

  return arg.prisma.userRole.findMany({
    where: {
      id: { in: userRolesData.map(userRole => userRole.id!) },
    },
  });
};
