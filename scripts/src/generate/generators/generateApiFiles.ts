import type { Project, SourceFile } from 'ts-morph';

import { camelCase, pascalCase } from 'es-toolkit';
import fs from 'fs-extra';
import path from 'path';
import pluralize from 'pluralize';

import type { ParsedModel } from '../utils/prismaParser';

import { dirConfig } from '../../utils/dirConfig';
import { logger } from '../../utils/logger';

const createStoreApi = async (
  project: Project,
  pascalCaseModelName: string,
  apiDomainDirPath: string,
): Promise<boolean> => {
  const apiPath = path.join(apiDomainDirPath, 'index.post.ts');

  if (fs.existsSync(apiPath)) {
    logger.warn(`API file already exists at ${apiPath}. Skipping creation.`);
    return false;
  }

  const sourceFile: SourceFile = project.createSourceFile(apiPath);

  sourceFile.addExportAssignment({
    expression: `defineEventHandler(new EventHandlerBuilder<Store${pascalCaseModelName}Request>().body(Store${pascalCaseModelName}RequestBodySchema).handle(Store${pascalCaseModelName}EventHandlerFn))`,
    isExportEquals: false,
  });

  sourceFile.organizeImports();
  sourceFile.formatText();

  return true;
};

const createUpdateApi = async (
  project: Project,
  pascalCaseModelName: string,
  apiDomainDirPath: string,
) => {
  const apiPath = path.join(apiDomainDirPath, '[id]', 'index.put.ts');

  if (fs.existsSync(apiPath)) {
    logger.warn(`API file already exists at ${apiPath}. Skipping creation.`);
    return false;
  }

  const sourceFile: SourceFile = project.createSourceFile(apiPath);

  sourceFile.addExportAssignment({
    expression: `defineEventHandler(new EventHandlerBuilder<Update${pascalCaseModelName}Request>().body(Update${pascalCaseModelName}RequestBodySchema).params(Update${pascalCaseModelName}RequestParamsSchema).handle(Update${pascalCaseModelName}EventHandlerFn))`,
    isExportEquals: false,
  });

  sourceFile.organizeImports();
  sourceFile.formatText();

  return true;
};

const createIndexApi = async (
  project: Project,
  pascalCaseModelName: string,
  apiDomainDirPath: string,
) => {
  const apiPath = path.join(apiDomainDirPath, 'index.get.ts');

  if (fs.existsSync(apiPath)) {
    logger.warn(`API file already exists at ${apiPath}. Skipping creation.`);
    return false;
  }

  const sourceFile: SourceFile = project.createSourceFile(apiPath);

  sourceFile.addExportAssignment({
    expression: `defineEventHandler(new EventHandlerBuilder<Index${pascalCaseModelName}Request>().query(Index${pascalCaseModelName}RequestQuerySchema).handle(Index${pascalCaseModelName}EventHandlerFn))`,
    isExportEquals: false,
  });

  sourceFile.organizeImports();
  sourceFile.formatText();

  return true;
};

const createShowApi = async (
  project: Project,
  pascalCaseModelName: string,
  apiDomainDirPath: string,
) => {
  const apiPath = path.join(apiDomainDirPath, '[id]', 'index.get.ts');

  if (fs.existsSync(apiPath)) {
    logger.warn(`API file already exists at ${apiPath}. Skipping creation.`);
    return false;
  }

  const sourceFile: SourceFile = project.createSourceFile(apiPath);

  sourceFile.addExportAssignment({
    expression: `defineEventHandler(new EventHandlerBuilder<Show${pascalCaseModelName}Request>().params(Show${pascalCaseModelName}RequestParamsSchema).handle(Show${pascalCaseModelName}EventHandlerFn))`,
    isExportEquals: false,
  });

  sourceFile.organizeImports();
  sourceFile.formatText();

  return true;
};

const createDestroyApi = async (
  project: Project,
  pascalCaseModelName: string,
  apiDomainDirPath: string,
) => {
  const withParamsPath = path.join(apiDomainDirPath, '[id]');
  const apiPath = path.join(withParamsPath, 'index.destroy.ts');

  if (fs.existsSync(apiPath)) {
    logger.warn(`API file already exists at ${apiPath}. Skipping creation.`);
    return false;
  }

  const sourceFile: SourceFile = project.createSourceFile(apiPath);

  sourceFile.addExportAssignment({
    expression: `defineEventHandler(new EventHandlerBuilder<Destroy${pascalCaseModelName}Request>().params(Destroy${pascalCaseModelName}RequestParamsSchema).handle(Destroy${pascalCaseModelName}EventHandlerFn))`,
    isExportEquals: false,
  });

  sourceFile.organizeImports();
  sourceFile.formatText();

  return true;
};

export const generateApiFiles = async (
  model: ParsedModel,
  project: Project,
): Promise<boolean> => {
  logger.info(`Generating API files for model: ${model.name}`);

  const pascalCaseModelName = pascalCase(model.name);
  const camelCaseModelName = camelCase(model.name);
  const folderName = pluralize(camelCaseModelName);

  const requestsPath = path.join(
    process.cwd(),
    dirConfig.APIS_PATH,
    folderName,
  );

  await fs.ensureDir(requestsPath);

  await Promise.all([
    createStoreApi(project, pascalCaseModelName, requestsPath),
    createUpdateApi(project, pascalCaseModelName, requestsPath),
    createShowApi(project, pascalCaseModelName, requestsPath),
    createDestroyApi(project, pascalCaseModelName, requestsPath),
    createIndexApi(project, pascalCaseModelName, requestsPath),
  ]);

  return true;
};
