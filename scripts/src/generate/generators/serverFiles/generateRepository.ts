import fs from 'fs-extra';
import path from 'path';
import pluralize from 'pluralize';
import {
  type MethodDeclarationStructure,
  type OptionalKind,
  type Project,
  Scope,
  type SourceFile,
  StructureKind,
} from 'ts-morph';

import { dirConfig } from '../../../utils/dirConfig';
import { logger } from '../../../utils/logger';
import { addRepositoryToProvider } from './addRepositoryToProvider';

// Reusable Method Factories
const createFindOneMethod = (
  camelCaseModelName: string,
  pascalCaseModelName: string,
): OptionalKind<MethodDeclarationStructure> => {
  return {
    isAsync: true,
    name: 'findOne',
    parameters: [
      {
        name: 'arg',
        type: `{
          where?: Prisma.${pascalCaseModelName}WhereInput;
          orderBy?: Prisma.${pascalCaseModelName}OrderByWithRelationInput | Prisma.${pascalCaseModelName}OrderByWithRelationInput[];
        }`,
      },
    ],
    returnType: `Promise<${pascalCaseModelName}Model | null>`,
    scope: Scope.Public,
    statements: `
      const { where, orderBy } = arg;
      return this.#prismaClient.${camelCaseModelName}.findFirst({ where, orderBy, include: ${pascalCaseModelName}Repository.#includeArg });
    `,
  };
};

const createFindManyMethod = (
  camelCaseModelName: string,
  pascalCaseModelName: string,
) => {
  return {
    isAsync: true,
    name: 'findMany',
    parameters: [
      {
        name: 'arg',
        type: `{
          where?: Prisma.${pascalCaseModelName}WhereInput;
          orderBy?: Prisma.${pascalCaseModelName}OrderByWithRelationInput | Prisma.${pascalCaseModelName}OrderByWithRelationInput[];
          skip?: number;
          take?: number;
        }`,
      },
    ],
    returnType: `Promise<${pascalCaseModelName}Model[]>`,
    scope: Scope.Public,
    statements: `
      const { where, orderBy, skip, take } = arg;
      return this.#prismaClient.${camelCaseModelName}.findMany({ where, orderBy, include: ${pascalCaseModelName}Repository.#includeArg, skip, take });
    `,
  };
};

const createCountMethod = (
  camelCaseModelName: string,
  pascalCaseModelName: string,
) => {
  return {
    isAsync: true,
    name: 'count',
    parameters: [
      {
        name: 'arg',
        type: `{
          where?: Prisma.${pascalCaseModelName}WhereInput;
          orderBy?: Prisma.${pascalCaseModelName}OrderByWithRelationInput | Prisma.${pascalCaseModelName}OrderByWithRelationInput[];
          skip?: number;
          take?: number;
        }`,
      },
    ],
    returnType: `Promise<number>`,
    scope: Scope.Public,
    statements: `
      const { where, orderBy, skip, take } = arg;
      return this.#prismaClient.${camelCaseModelName}.count({ where, orderBy, skip, take });
    `,
  };
};

const createAddOneMethod = (
  camelCaseModelName: string,
  pascalCaseModelName: string,
) => {
  return {
    isAsync: true,
    name: 'addOne',
    parameters: [
      {
        name: 'arg',
        type: `{ data: Prisma.${pascalCaseModelName}CreateArgs["data"] }`,
      },
    ],
    returnType: `Promise<${pascalCaseModelName}Model>`,
    scope: Scope.Public,
    statements: `
      const { data } = arg;
      return this.#prismaClient.${camelCaseModelName}.create({ data, include: ${pascalCaseModelName}Repository.#includeArg });
    `,
  };
};

const createUpdateOneMethod = (
  camelCaseModelName: string,
  pascalCaseModelName: string,
) => {
  return {
    isAsync: true,
    name: 'updateOne',
    parameters: [
      {
        name: 'arg',
        type: `{
          where: Prisma.${pascalCaseModelName}WhereUniqueInput;
          data: Prisma.${pascalCaseModelName}UpdateArgs["data"];
        }`,
      },
    ],
    returnType: `Promise<${pascalCaseModelName}Model>`,
    scope: Scope.Public,
    statements: `
      const { where, data } = arg;
      return this.#prismaClient.${camelCaseModelName}.update({ where, data, include: ${pascalCaseModelName}Repository.#includeArg });
    `,
  };
};

const createDeleteOneMethod = (
  camelCaseModelName: string,
  pascalCaseModelName: string,
) => {
  return {
    isAsync: true,
    name: 'deleteOne',
    parameters: [
      {
        name: 'arg',
        type: `{ where: Prisma.${pascalCaseModelName}WhereUniqueInput }`,
      },
    ],
    scope: Scope.Public,
    statements: `
      const { where } = arg;
      await this.#prismaClient.${camelCaseModelName}.delete({ where });
    `,
  };
};

const createExistOneMethod = (
  camelCaseModelName: string,
  pascalCaseModelName: string,
) => {
  return {
    isAsync: true,
    name: 'existOne',
    parameters: [
      {
        name: 'arg',
        type: `{ where: Prisma.${pascalCaseModelName}WhereUniqueInput }`,
      },
    ],
    returnType: 'Promise<boolean>',
    scope: Scope.Public,
    statements: `
      const { where } = arg;
      const count = await this.#prismaClient.${camelCaseModelName}.count({ where, take: 1 });
      return count > 0;
    `,
  };
};

const createExistManyMethod = (
  camelCaseModelName: string,
  pascalCaseModelName: string,
) => {
  return {
    isAsync: true,
    name: 'existMany',
    parameters: [
      {
        name: 'arg',
        type: `{
          where: Prisma.${pascalCaseModelName}WhereInput;
          expected: number;
        }`,
      },
    ],
    returnType: 'Promise<boolean>',
    scope: Scope.Public,
    statements: `
      const { where, expected } = arg;
      const count = await this.#prismaClient.${camelCaseModelName}.count({ where });
      return count === expected;
    `,
  };
};

const addTypeImports = (
  sourceFile: SourceFile,
  camelCaseModelName: string,
  pascalCaseModelName: string,
) => {
  sourceFile.addImportDeclarations([
    {
      isTypeOnly: true,
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: '~~/generated/prisma/client',
      namedImports: ['Prisma'],
    },
    {
      isTypeOnly: true,
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: '~~/server/services/prisma/prismaProvider',
      namedImports: ['ExtendedPrismaClient'],
    },
    {
      isTypeOnly: true,
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: `./${camelCaseModelName}Model`,
      namedImports: [`${pascalCaseModelName}Model`],
    },
  ]);
};

const addRepositoryClass = (
  sourceFile: SourceFile,
  pascalCaseModelName: string,
  camelCaseModelName: string,
) => {
  sourceFile.addClass({
    ctors: [
      {
        parameters: [{ name: 'prismaClient', type: 'ExtendedPrismaClient' }],
        statements: ['this.#prismaClient = prismaClient;'],
      },
    ],
    isExported: true,
    methods: [
      createFindOneMethod(camelCaseModelName, pascalCaseModelName),
      createFindManyMethod(camelCaseModelName, pascalCaseModelName),
      createCountMethod(camelCaseModelName, pascalCaseModelName),
      createAddOneMethod(camelCaseModelName, pascalCaseModelName),
      createUpdateOneMethod(camelCaseModelName, pascalCaseModelName),
      createDeleteOneMethod(camelCaseModelName, pascalCaseModelName),
      createExistOneMethod(camelCaseModelName, pascalCaseModelName),
      createExistManyMethod(camelCaseModelName, pascalCaseModelName),
    ],
    name: `${pascalCaseModelName}Repository`,
    properties: [
      {
        name: '#prismaClient',
        type: 'ExtendedPrismaClient',
      },
      {
        initializer: `{} satisfies Prisma.${pascalCaseModelName}Include`,
        isReadonly: true,
        isStatic: true,
        kind: StructureKind.Property,
        name: '#includeArg',
      },
    ],
  });
};

export const generateRepository = async (
  project: Project,
  pascalCaseModelName: string,
  camelCaseModelName: string,
  serverDomainDirPath: string,
  // eslint-disable-next-line no-unused-vars
  addToExports: (exportName: string) => void,
): Promise<boolean> => {
  const repositoryPath = path.join(
    serverDomainDirPath,
    `${camelCaseModelName}Repository.ts`,
  );

  if (fs.existsSync(repositoryPath)) {
    logger.warn(
      `Repository already exists at ${repositoryPath}. Skipping creation.`,
    );
    return false;
  }

  const sourceFile = project.createSourceFile(repositoryPath);

  addTypeImports(sourceFile, pascalCaseModelName, camelCaseModelName);
  addRepositoryClass(sourceFile, pascalCaseModelName, camelCaseModelName);

  sourceFile.organizeImports();
  sourceFile.formatText();

  addToExports(`${camelCaseModelName}Repository`);

  addRepositoryToProvider(project, {
    instanceImport: `~~/${dirConfig.SERVER_DOMAINS_PATH}/${pluralize(camelCaseModelName)}/${camelCaseModelName}Repository`,
    name: `${camelCaseModelName}Repository`,
    type: `${pascalCaseModelName}Repository`,
  });

  return true;
};
