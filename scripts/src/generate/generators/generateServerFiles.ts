import type { Project } from 'ts-morph';

import { camelCase, pascalCase } from 'es-toolkit';
import path from 'path';
import pluralize from 'pluralize';

import type { ParsedModel } from '../utils/prismaParser';

import { dirConfig } from '../../utils/dirConfig';
import { logger } from '../../utils/logger';
import { generateDTOMapper } from './serverFiles/generateDTOMapper';
import { generateModel } from './serverFiles/generateModel';
import { generateRepository } from './serverFiles/generateRepository';

export const generateServerFiles = async (
  model: ParsedModel,
  project: Project,
  // eslint-disable-next-line no-unused-vars
  addToExports: (exportName: string) => void,
): Promise<boolean> => {
  logger.info(`Generating server files for model: ${model.name}`);

  const camelCaseModelName = camelCase(model.name);
  const pascalCaseModelName = pascalCase(model.name);
  const folderName = pluralize(camelCaseModelName);

  const serverDomainPath = path.join(
    process.cwd(),
    dirConfig.SERVER_DOMAINS_PATH,
    folderName,
  );

  await Promise.all([
    generateModel(
      project,
      pascalCaseModelName,
      camelCaseModelName,
      serverDomainPath,
      addToExports,
    ),
    generateDTOMapper(
      model.fields,
      project,
      pascalCaseModelName,
      camelCaseModelName,
      serverDomainPath,
      true, // Assuming isNativeTypeOnly is true for simplicity
      addToExports,
    ),
    generateRepository(
      project,
      pascalCaseModelName,
      camelCaseModelName,
      serverDomainPath,
      addToExports,
    ),
  ]);

  return true;
};
