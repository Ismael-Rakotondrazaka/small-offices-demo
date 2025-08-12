import type { Project, SourceFile } from 'ts-morph';

import { camelCase, pascalCase } from 'change-case';
import fs from 'fs-extra';
import path from 'path';
import pluralize from 'pluralize';
import { VariableDeclarationKind } from 'ts-morph';

import type { ParsedModel } from '../utils/prismaParser';

import { dirConfig } from '../../utils/dirConfig';
import { logger } from '../../utils/logger';
import { generateZodSchema } from './generateZodSchema';

const EXCLUDED_FIELDS = ['id', 'createdAt', 'updatedAt', 'deletedAt'];

const createStoreRequest = async (
  model: ParsedModel,
  project: Project,
  requestsPath: string,
  // eslint-disable-next-line no-unused-vars
  addToExports: (exportName: string) => void,
): Promise<boolean> => {
  const pascalCaseModelName = pascalCase(model.name);

  const requestPath = path.join(
    requestsPath,
    `store${pascalCaseModelName}Request.ts`,
  );

  if (fs.existsSync(requestPath)) {
    logger.warn(
      `Store request file already exists at ${requestPath}. Skipping creation.`,
    );
    return false;
  }

  const sourceFile: SourceFile = project.createSourceFile(requestPath);

  sourceFile.addImportDeclaration({
    moduleSpecifier: 'zod',
    namedImports: ['z'],
  });

  sourceFile.addImportDeclaration({
    isTypeOnly: true,
    moduleSpecifier: '#shared/requests/request',
    namedImports: ['Request'],
  });

  // Add Body
  generateZodSchema(
    sourceFile,
    model,
    `Store${pascalCaseModelName}RequestBody`,
    {
      excludeFields: EXCLUDED_FIELDS,
      isAllRequired: true,
      isNativeTypeOnly: true,
      withInferredTypes: true,
    },
  );

  // Add Data
  sourceFile.addTypeAlias({
    isExported: true,
    name: `Store${pascalCaseModelName}RequestData`,
    type: `{
  data: ${pascalCaseModelName}DTO;
}`,
  });

  // Add Request
  sourceFile.addTypeAlias({
    isExported: true,
    name: `Store${pascalCaseModelName}Request`,
    type: `Request<Store${pascalCaseModelName}RequestData, Store${pascalCaseModelName}RequestBody>`,
  });

  sourceFile.organizeImports();
  sourceFile.formatText();
  addToExports(`store${pascalCaseModelName}Request`);

  return true;
};

const createUpdateRequest = async (
  model: ParsedModel,
  project: Project,
  requestsPath: string,
  // eslint-disable-next-line no-unused-vars
  addToExports: (exportName: string) => void,
): Promise<boolean> => {
  const pascalCaseModelName = pascalCase(model.name);

  const requestPath = path.join(
    requestsPath,
    `update${pascalCaseModelName}Request.ts`,
  );

  if (fs.existsSync(requestPath)) {
    logger.warn(
      `Update request file already exists at ${requestPath}. Skipping creation.`,
    );
    return false;
  }

  const sourceFile: SourceFile = project.createSourceFile(requestPath);

  sourceFile.addImportDeclaration({
    moduleSpecifier: 'zod',
    namedImports: ['z'],
  });

  sourceFile.addImportDeclaration({
    isTypeOnly: true,
    moduleSpecifier: '#shared/requests/request',
    namedImports: ['Request'],
  });

  sourceFile.addImportDeclaration({
    moduleSpecifier: '#shared/schemas/identifierSchema',
    namedImports: ['StringIdentifierSchema'],
  });

  // Add Params
  sourceFile.addVariableStatement({
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        initializer: `z.object({ id: StringIdentifierSchema });`,
        name: `Update${pascalCaseModelName}RequestParamsSchema`,
      },
    ],
    isExported: true,
  });

  sourceFile.addTypeAlias({
    isExported: true,
    name: `Update${pascalCaseModelName}RequestParams`,
    type: `z.infer<typeof Update${pascalCaseModelName}RequestParamsSchema>`,
  });

  // Add Body
  generateZodSchema(
    sourceFile,
    model,
    `Update${pascalCaseModelName}RequestBody`,
    {
      excludeFields: EXCLUDED_FIELDS,
      isAllOptional: true,
      isNativeTypeOnly: true,
      withInferredTypes: true,
    },
  );

  // Add Data
  sourceFile.addTypeAlias({
    isExported: true,
    name: `Update${pascalCaseModelName}RequestData`,
    type: `{ data: ${pascalCaseModelName}DTO; }`,
  });

  // Add Request
  sourceFile.addTypeAlias({
    isExported: true,
    name: `Update${pascalCaseModelName}Request`,
    type: `Request<Update${pascalCaseModelName}RequestData, Update${pascalCaseModelName}RequestBody, Update${pascalCaseModelName}RequestParams>`,
  });

  sourceFile.organizeImports();
  sourceFile.formatText();
  addToExports(`update${pascalCaseModelName}Request`);

  return true;
};

const createShowRequest = async (
  model: ParsedModel,
  project: Project,
  requestsPath: string,
  // eslint-disable-next-line no-unused-vars
  addToExports: (exportName: string) => void,
): Promise<boolean> => {
  const pascalCaseModelName = pascalCase(model.name);

  const requestPath = path.join(
    requestsPath,
    `show${pascalCaseModelName}Request.ts`,
  );

  if (fs.existsSync(requestPath)) {
    logger.warn(
      `Show request file already exists at ${requestPath}. Skipping creation.`,
    );
    return false;
  }

  const sourceFile: SourceFile = project.createSourceFile(requestPath);

  sourceFile.addImportDeclaration({
    moduleSpecifier: 'zod',
    namedImports: ['z'],
  });

  sourceFile.addImportDeclaration({
    isTypeOnly: true,
    moduleSpecifier: '#shared/requests/request',
    namedImports: ['Request'],
  });

  sourceFile.addImportDeclaration({
    moduleSpecifier: '#shared/schemas/identifierSchema',
    namedImports: ['StringIdentifierSchema'],
  });

  // Add Params
  sourceFile.addVariableStatement({
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        initializer: `z.object({ id: StringIdentifierSchema });`,
        name: `Show${pascalCaseModelName}RequestParamsSchema`,
      },
    ],
    isExported: true,
  });

  sourceFile.addTypeAlias({
    isExported: true,
    name: `Show${pascalCaseModelName}RequestParams`,
    type: `z.infer<typeof Show${pascalCaseModelName}RequestParamsSchema>`,
  });

  // Add Data
  sourceFile.addTypeAlias({
    isExported: true,
    name: `Show${pascalCaseModelName}RequestData`,
    type: `{
      data: ${pascalCaseModelName}DTO;
    }`,
  });

  // Add Request
  sourceFile.addTypeAlias({
    isExported: true,
    name: `Show${pascalCaseModelName}Request`,
    type: `Request<Show${pascalCaseModelName}RequestData, Record<string, never>, Show${pascalCaseModelName}RequestParams>`,
  });

  sourceFile.organizeImports();
  sourceFile.formatText();
  addToExports(`show${pascalCaseModelName}Request`);

  return true;
};

const createDestroyRequest = async (
  model: ParsedModel,
  project: Project,
  requestsPath: string,
  // eslint-disable-next-line no-unused-vars
  addToExports: (exportName: string) => void,
): Promise<boolean> => {
  const pascalCaseModelName = pascalCase(model.name);

  const requestPath = path.join(
    requestsPath,
    `destroy${pascalCaseModelName}Request.ts`,
  );

  if (fs.existsSync(requestPath)) {
    logger.warn(
      `Destroy request file already exists at ${requestPath}. Skipping creation.`,
    );
    return false;
  }

  const sourceFile: SourceFile = project.createSourceFile(requestPath);

  sourceFile.addImportDeclaration({
    moduleSpecifier: 'zod',
    namedImports: ['z'],
  });

  sourceFile.addImportDeclaration({
    isTypeOnly: true,
    moduleSpecifier: '#shared/requests/request',
    namedImports: ['Request'],
  });

  sourceFile.addImportDeclaration({
    moduleSpecifier: '#shared/schemas/identifierSchema',
    namedImports: ['StringIdentifierSchema'],
  });

  // Add Params
  sourceFile.addVariableStatement({
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        initializer: `z.object({ id: StringIdentifierSchema });`,
        name: `Destroy${pascalCaseModelName}RequestParamsSchema`,
      },
    ],
    isExported: true,
  });

  sourceFile.addTypeAlias({
    isExported: true,
    name: `Destroy${pascalCaseModelName}RequestParams`,
    type: `z.infer<typeof Destroy${pascalCaseModelName}RequestParamsSchema>`,
  });

  // Add Data
  sourceFile.addTypeAlias({
    isExported: true,
    name: `Destroy${pascalCaseModelName}RequestData`,
    type: `{
      data: ${pascalCaseModelName}DTO;
    }`,
  });

  // Add Request
  sourceFile.addTypeAlias({
    isExported: true,
    name: `Destroy${pascalCaseModelName}Request`,
    type: `Request<Destroy${pascalCaseModelName}RequestData, Record<string, never>, Destroy${pascalCaseModelName}RequestParams>`,
  });

  sourceFile.organizeImports();
  sourceFile.formatText();
  addToExports(`destroy${pascalCaseModelName}Request`);

  return true;
};

const createIndexRequest = async (
  model: ParsedModel,
  project: Project,
  requestsPath: string,
  // eslint-disable-next-line no-unused-vars
  addToExports: (exportName: string) => void,
): Promise<boolean> => {
  const pascalCaseModelName = pascalCase(model.name);
  const camelCaseModelName = camelCase(model.name);
  const folderName = pluralize(camelCaseModelName);

  const requestPath = path.join(
    requestsPath,
    `index${pascalCaseModelName}Request.ts`,
  );

  if (fs.existsSync(requestPath)) {
    logger.warn(
      `Index request file already exists at ${requestPath}. Skipping creation.`,
    );
    return false;
  }

  const sourceFile: SourceFile = project.createSourceFile(requestPath);

  sourceFile.addImportDeclaration({
    moduleSpecifier: 'zod',
    namedImports: ['z'],
  });

  sourceFile.addImportDeclaration({
    moduleSpecifier: `#shared/domains/${folderName}/${camelCaseModelName}Config`,
    namedImports: [`${camelCaseModelName}Config`],
  });

  sourceFile.addImportDeclaration({
    isTypeOnly: true,
    moduleSpecifier: '#shared/requests/request',
    namedImports: ['Request'],
  });

  sourceFile.addImportDeclaration({
    moduleSpecifier: '#shared/schemas/paginationSchema',
    namedImports: ['makePaginatedSchema'],
  });

  sourceFile.addImportDeclaration({
    moduleSpecifier: '#shared/schemas/sortOrderSchema',
    namedImports: ['SortOrderSchema'],
  });

  // Add Data
  sourceFile.addTypeAlias({
    isExported: true,
    name: `Index${pascalCaseModelName}RequestData`,
    type: `{ data: ${pascalCaseModelName}DTO[]; pagination: PaginationDTO; }`,
  });

  // Add Query
  sourceFile.addVariableStatement({
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        initializer: `z.object({ "orderBy[createdAt]": SortOrderSchema, "orderBy[id]": SortOrderSchema }).partial().merge(makePaginatedSchema({ defaultPageSize: ${camelCaseModelName}Config.PAGE_SIZE_DEFAULT_VALUE }));`,
        name: `Index${pascalCaseModelName}RequestQuerySchema`,
      },
    ],
    isExported: true,
  });

  sourceFile.addTypeAlias({
    isExported: true,
    name: `Index${pascalCaseModelName}RequestQuery`,
    type: `z.infer<typeof Index${pascalCaseModelName}RequestQuerySchema>`,
  });

  // Add Request
  sourceFile.addTypeAlias({
    isExported: true,
    name: `Index${pascalCaseModelName}Request`,
    type: `Request<Index${pascalCaseModelName}RequestData, Record<string, never>, Record<string, never>, Index${pascalCaseModelName}RequestQuery>`,
  });

  sourceFile.organizeImports();
  sourceFile.formatText();
  addToExports(`index${pascalCaseModelName}Request`);

  return true;
};

export const generateRequestFiles = async (
  model: ParsedModel,
  project: Project,
  // eslint-disable-next-line no-unused-vars
  addToExports: (exportName: string) => void,
): Promise<boolean> => {
  logger.info(`Generating request files for model: ${model.name}`);

  const camelCaseModelName = camelCase(model.name);
  const folderName = pluralize(camelCaseModelName);

  const requestsPath = path.join(
    process.cwd(),
    dirConfig.SHARED_DOMAINS_PATH,
    folderName,
  );

  await Promise.all([
    createStoreRequest(model, project, requestsPath, addToExports),
    createUpdateRequest(model, project, requestsPath, addToExports),
    createShowRequest(model, project, requestsPath, addToExports),
    createDestroyRequest(model, project, requestsPath, addToExports),
    createIndexRequest(model, project, requestsPath, addToExports),
  ]);

  return true;
};
