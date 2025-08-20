import { faker } from '@faker-js/faker';
import {
  $Enums,
  type Prisma,
  type PrismaClient,
  type UserRole,
} from '../../../../generated/prisma/client';

import { createStringIdentifier } from './identifiers';

const createUserRoleData = (): Prisma.UserRoleCreateInput => {
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
  const userRolesData: Prisma.UserRoleCreateInput[] = [];
  const count = arg.count || 5; // Default to 5 user roles

  for (let i = 0; i < count; i++) {
    userRolesData.push(createUserRoleData());
  }

  return Promise.all(
    userRolesData.map(userRoleData =>
      arg.prisma.userRole.create({
        data: userRoleData,
      }),
    ),
  );
};
