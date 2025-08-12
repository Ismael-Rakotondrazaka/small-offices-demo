import { camelCase, pascalCase } from 'change-case';
import fs from 'fs-extra';
import path from 'path';
import pluralize from 'pluralize';
import {
  type Project,
  type SourceFile,
  VariableDeclarationKind,
} from 'ts-morph';

import { dirConfig } from '../../utils/dirConfig';
import { logger } from '../../utils/logger';
import { type ParsedModel, TypeScriptNativeTypes } from '../utils/prismaParser';

const EXCLUDED_FIELDS = ['createdAt', 'updatedAt', 'deletedAt', 'id'];

const createStoreEventHandler = async (
  project: Project,
  model: ParsedModel,
  camelCaseModelName: string,
  pascalCaseModelName: string,
  serverDomainDirPath: string,
  isNativeTypeOnly: boolean,
  // eslint-disable-next-line no-unused-vars
  addToExports: (exportName: string) => void,
): Promise<boolean> => {
  const apiPath = path.join(
    serverDomainDirPath,
    `store${pascalCaseModelName}EventHandlerFn.ts`,
  );

  if (fs.existsSync(apiPath)) {
    logger.warn(
      `Store Event handler file already exists at ${apiPath}. Skipping creation.`,
    );
    return false;
  }

  const sourceFile: SourceFile = project.createSourceFile(apiPath);

  // Add imports
  sourceFile.addImportDeclaration({
    moduleSpecifier: '~~/server/core',
    namedImports: ['IdentifierGenerator'],
  });

  sourceFile.addImportDeclaration({
    moduleSpecifier: '~~/server/services',
    namedImports: ['RepositoryProvider'],
  });

  sourceFile.addImportDeclaration({
    moduleSpecifier: `./${camelCaseModelName}DTOMapper`,
    namedImports: [`${pascalCaseModelName}DTOMapper`],
  });

  // Add the event handler function
  sourceFile.addVariableStatement({
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        initializer: `async ({ body }) => {
  const ${camelCaseModelName} = await RepositoryProvider.${camelCaseModelName}Repository.addOne({
  data: {
    ${model.fields
      .filter((field) => {
        if (EXCLUDED_FIELDS.includes(field.name)) {
          return false;
        }

        if (!isNativeTypeOnly) {
          return true;
        }

        if ((TypeScriptNativeTypes as string[]).includes(field.type)) {
          return true;
        }

        return false;
      })
      .map(field => `${field.name}: body.${field.name}`)
      .join(',\n    ')}
    },
  });

  return {
    data: ${pascalCaseModelName}DTOMapper.toDTO(${camelCaseModelName}),
  };
}`,
        name: `Store${pascalCaseModelName}EventHandlerFn`,
        type: `EventHandlerFn<Store${pascalCaseModelName}Request>`,
      },
    ],
    isExported: true,
  });

  sourceFile.organizeImports();
  sourceFile.formatText();

  addToExports(`store${pascalCaseModelName}EventHandlerFn`);

  return true;
};

const createUpdateEventHandler = async (
  project: Project,
  model: ParsedModel,
  camelCaseModelName: string,
  pascalCaseModelName: string,
  serverDomainDirPath: string,
  isNativeTypeOnly: boolean,
  // eslint-disable-next-line no-unused-vars
  addToExports: (exportName: string) => void,
): Promise<boolean> => {
  const apiPath = path.join(
    serverDomainDirPath,
    `update${pascalCaseModelName}EventHandlerFn.ts`,
  );

  if (fs.existsSync(apiPath)) {
    logger.warn(
      `Update Event handler file already exists at ${apiPath}. Skipping creation.`,
    );
    return false;
  }

  const sourceFile: SourceFile = project.createSourceFile(apiPath);

  // Add imports
  sourceFile.addImportDeclaration({
    moduleSpecifier: '~~/server/core',
    namedImports: ['IdentifierGenerator'],
  });

  sourceFile.addImportDeclaration({
    moduleSpecifier: '~~/server/services',
    namedImports: ['RepositoryProvider'],
  });

  sourceFile.addImportDeclaration({
    moduleSpecifier: `./${camelCaseModelName}DTOMapper`,
    namedImports: [`${pascalCaseModelName}DTOMapper`],
  });

  // Add the event handler function
  sourceFile.addVariableStatement({
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        initializer: `async ({ body, params }) => {
  const ${camelCaseModelName} = await RepositoryProvider.${camelCaseModelName}Repository.findOne({
    where: {
      id: params.id
    }
  });

  if (${camelCaseModelName} === null) {
    throw Exception.notFound({
      data: {},
    });
  }

  const updated${pascalCaseModelName} = await RepositoryProvider.${camelCaseModelName}Repository.updateOne({
    where: {
      id: params.id
    },
    data: {
      ${model.fields
        .filter((field) => {
          if (EXCLUDED_FIELDS.includes(field.name)) {
            return false;
          }

          if (!isNativeTypeOnly) {
            return true;
          }

          if ((TypeScriptNativeTypes as string[]).includes(field.type)) {
            return true;
          }

          return false;
        })
        .map(field => `${field.name}: body.${field.name}`)
        .join(',\n      ')}
    },
  });

  return {
    data: ${pascalCaseModelName}DTOMapper.toDTO(updated${pascalCaseModelName}),
  };
}`,
        name: `Update${pascalCaseModelName}EventHandlerFn`,
        type: `EventHandlerFn<Update${pascalCaseModelName}Request>`,
      },
    ],
    isExported: true,
  });

  sourceFile.organizeImports();
  sourceFile.formatText();

  addToExports(`update${pascalCaseModelName}EventHandlerFn`);

  return true;
};

const createShowEventHandler = async (
  project: Project,
  camelCaseModelName: string,
  pascalCaseModelName: string,
  serverDomainDirPath: string,
  // eslint-disable-next-line no-unused-vars
  addToExports: (exportName: string) => void,
): Promise<boolean> => {
  const apiPath = path.join(
    serverDomainDirPath,
    `show${pascalCaseModelName}EventHandlerFn.ts`,
  );

  if (fs.existsSync(apiPath)) {
    logger.warn(
      `Show Event handler file already exists at ${apiPath}. Skipping creation.`,
    );
    return false;
  }

  const sourceFile: SourceFile = project.createSourceFile(apiPath);

  // Add imports
  sourceFile.addImportDeclaration({
    moduleSpecifier: '~~/server/core',
    namedImports: ['IdentifierGenerator'],
  });

  sourceFile.addImportDeclaration({
    moduleSpecifier: '~~/server/services',
    namedImports: ['RepositoryProvider'],
  });

  sourceFile.addImportDeclaration({
    moduleSpecifier: `./${camelCaseModelName}DTOMapper`,
    namedImports: [`${pascalCaseModelName}DTOMapper`],
  });

  // Add the event handler function
  sourceFile.addVariableStatement({
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        initializer: `async ({ params }) => {
  const ${camelCaseModelName} = await RepositoryProvider.${camelCaseModelName}Repository.findOne({
    where: {
      id: params.id
    }
  });

  if (${camelCaseModelName} === null) {
    throw Exception.notFound({
      data: {},
    });
  }

  return {
    data: ${pascalCaseModelName}DTOMapper.toDTO(${camelCaseModelName}),
  };
}`,
        name: `Show${pascalCaseModelName}EventHandlerFn`,
        type: `EventHandlerFn<Show${pascalCaseModelName}Request>`,
      },
    ],
    isExported: true,
  });

  sourceFile.organizeImports();
  sourceFile.formatText();

  addToExports(`show${pascalCaseModelName}EventHandlerFn`);

  return true;
};

const createIndexEventHandler = async (
  project: Project,
  camelCaseModelName: string,
  pascalCaseModelName: string,
  serverDomainDirPath: string,
  // eslint-disable-next-line no-unused-vars
  addToExports: (exportName: string) => void,
): Promise<boolean> => {
  const apiPath = path.join(
    serverDomainDirPath,
    `index${pascalCaseModelName}EventHandlerFn.ts`,
  );

  if (fs.existsSync(apiPath)) {
    logger.warn(
      `Index Event handler file already exists at ${apiPath}. Skipping creation.`,
    );
    return false;
  }

  const sourceFile: SourceFile = project.createSourceFile(apiPath);

  // Add imports
  sourceFile.addImportDeclaration({
    isTypeOnly: true,
    moduleSpecifier: '~~/generated/prisma/client',
    namedImports: ['Prisma'],
  });

  sourceFile.addImportDeclaration({
    moduleSpecifier: '~~/server/core',
    namedImports: ['IdentifierGenerator', 'RequestInputHelper'],
  });

  sourceFile.addImportDeclaration({
    moduleSpecifier: '~~/server/domains/paginations/paginationDTOMapper',
    namedImports: ['PaginationDTOMapper'],
  });

  sourceFile.addImportDeclaration({
    moduleSpecifier: '~~/server/services',
    namedImports: ['RepositoryProvider'],
  });

  sourceFile.addImportDeclaration({
    moduleSpecifier: `./${camelCaseModelName}DTOMapper`,
    namedImports: [`${pascalCaseModelName}DTOMapper`],
  });

  // Add the event handler function
  sourceFile.addVariableStatement({
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        initializer: `async ({ query, path }) => {
  const haveWhereQueries = RequestInputHelper.haveWhereQueries<Index${pascalCaseModelName}Request>(query, []);
  const where: Prisma.${pascalCaseModelName}WhereInput | undefined = { AND: haveWhereQueries ? [] : undefined };
  const totalCount = await RepositoryProvider.${camelCaseModelName}Repository.count({ where });
  const pagination = new Pagination({ totalCount, path, page: query.page, pageSize: query.pageSize });
  const ${pluralize(camelCaseModelName)} = await RepositoryProvider.${camelCaseModelName}Repository.findMany({ where, orderBy: [{ createdAt: query["orderBy[createdAt]"] }], skip: pagination.offset, take: pagination.pageSize });

  return {
    data: ${pascalCaseModelName}DTOMapper.toDTOs(${pluralize(camelCaseModelName)}),
    pagination: PaginationDTOMapper.toDTO(pagination, ${pluralize(camelCaseModelName)}.length),
  };
}`,
        name: `Index${pascalCaseModelName}EventHandlerFn`,
        type: `EventHandlerFn<Index${pascalCaseModelName}Request>`,
      },
    ],
    isExported: true,
  });

  sourceFile.organizeImports();
  sourceFile.formatText();

  addToExports(`index${pascalCaseModelName}EventHandlerFn`);

  return true;
};

const createDestroyEventHandler = async (
  project: Project,
  camelCaseModelName: string,
  pascalCaseModelName: string,
  serverDomainDirPath: string,
  // eslint-disable-next-line no-unused-vars
  addToExports: (exportName: string) => void,
): Promise<boolean> => {
  const apiPath = path.join(
    serverDomainDirPath,
    `destroy${pascalCaseModelName}EventHandlerFn.ts`,
  );

  if (fs.existsSync(apiPath)) {
    logger.warn(
      `Destroy Event handler file already exists at ${apiPath}. Skipping creation.`,
    );
    return false;
  }

  const sourceFile: SourceFile = project.createSourceFile(apiPath);

  // Add imports
  sourceFile.addImportDeclaration({
    moduleSpecifier: '~~/server/core',
    namedImports: ['IdentifierGenerator'],
  });

  sourceFile.addImportDeclaration({
    moduleSpecifier: '~~/server/services',
    namedImports: ['RepositoryProvider'],
  });

  sourceFile.addImportDeclaration({
    moduleSpecifier: `./${camelCaseModelName}DTOMapper`,
    namedImports: [`${pascalCaseModelName}DTOMapper`],
  });

  // Add the event handler function
  sourceFile.addVariableStatement({
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        initializer: `async ({ params }) => {
  const ${camelCaseModelName} = await RepositoryProvider.${camelCaseModelName}Repository.findOne({
    where: {
      id: params.id
    }
  });

  if (${camelCaseModelName} === null) {
    throw Exception.notFound({
      data: {},
    });
  }

  await RepositoryProvider.${camelCaseModelName}Repository.deleteOne({
    where: {
      id: params.id
    }
  });

  return {
    data: ${pascalCaseModelName}DTOMapper.toDTO(${camelCaseModelName}),
  };
}`,
        name: `Destroy${pascalCaseModelName}EventHandlerFn`,
        type: `EventHandlerFn<Destroy${pascalCaseModelName}Request>`,
      },
    ],
    isExported: true,
  });

  sourceFile.organizeImports();
  sourceFile.formatText();

  addToExports(`destroy${pascalCaseModelName}EventHandlerFn`);

  return true;
};

export const generateEventHandlers = async (
  model: ParsedModel,
  project: Project,
  // eslint-disable-next-line no-unused-vars
  addToExports: (exportName: string) => void,
): Promise<boolean> => {
  logger.info(`Generating event handlers for model: ${model.name}`);

  const camelCaseModelName = camelCase(model.name);
  const pascalCaseModelName = pascalCase(model.name);
  const folderName = pluralize(camelCaseModelName);

  const serverDomainDirPath = path.join(
    process.cwd(),
    dirConfig.SERVER_DOMAINS_PATH,
    folderName,
  );

  // Adjust this based on your requirements
  const isNativeTypeOnly = true;

  await Promise.all([
    createStoreEventHandler(
      project,
      model,
      camelCaseModelName,
      pascalCaseModelName,
      serverDomainDirPath,
      isNativeTypeOnly,
      addToExports,
    ),
    createUpdateEventHandler(
      project,
      model,
      camelCaseModelName,
      pascalCaseModelName,
      serverDomainDirPath,
      isNativeTypeOnly,
      addToExports,
    ),
    createShowEventHandler(
      project,
      camelCaseModelName,
      pascalCaseModelName,
      serverDomainDirPath,
      addToExports,
    ),
    createIndexEventHandler(
      project,
      camelCaseModelName,
      pascalCaseModelName,
      serverDomainDirPath,
      addToExports,
    ),
    createDestroyEventHandler(
      project,
      camelCaseModelName,
      pascalCaseModelName,
      serverDomainDirPath,
      addToExports,
    ),
  ]);

  return true;
};
