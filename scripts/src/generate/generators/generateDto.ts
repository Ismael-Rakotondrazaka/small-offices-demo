import type { Project } from 'ts-morph';

import { camelCase, pascalCase } from 'es-toolkit';
import fs from 'fs-extra';
import path from 'path';
import pluralize from 'pluralize';

import type { ParsedModel } from '../utils/prismaParser';

import { logger } from '../../utils/logger';
import { generateZodSchema } from './generateZodSchema';

interface DtoFileInfo {
  camelCaseModelName: string;
  dtoName: string;
  filename: string;
  filePath: string;
  folderPath: string;
  interfaceName: string;
  interfaceSchemaName: string;
}

const createDtoFileInfo = (model: ParsedModel): DtoFileInfo => {
  const camelCaseModelName = camelCase(model.name);
  const folderName = pluralize(camelCaseModelName);
  const dtoName = `${camelCaseModelName}DTO`;
  const filename = `${dtoName}.ts`;
  const pascalCaseModelName = pascalCase(model.name);

  const domainsPath = path.join(process.cwd(), DOMAINS_PATH);
  const folderPath = path.join(domainsPath, folderName);
  const filePath = path.join(folderPath, filename);

  return {
    camelCaseModelName,
    dtoName,
    filename: filename,
    filePath,
    folderPath,
    interfaceName: `${pascalCaseModelName}DTO`,
    interfaceSchemaName: `${pascalCaseModelName}DTOSchema`,
  };
};

const DOMAINS_PATH = 'shared/domains';

export const generateDto = async (
  model: ParsedModel,
  project: Project,
  // eslint-disable-next-line no-unused-vars
  addToExports: (exportName: string) => void,
): Promise<boolean> => {
  logger.info(`Generating DTO for model: ${model.name}`);

  const dtoFileInfo = createDtoFileInfo(model);

  if (fs.existsSync(dtoFileInfo.filePath)) {
    logger.warn(
      `DTO file already exists at ${dtoFileInfo.filePath}. Skipping creation.`,
    );
    return false;
  }

  const sourceFile = project.createSourceFile(dtoFileInfo.filePath);

  sourceFile.addImportDeclaration({
    moduleSpecifier: 'zod',
    namedImports: ['z'],
  });

  generateZodSchema(sourceFile, model, dtoFileInfo.interfaceName, {
    isNativeTypeOnly: true,
    withTypeFirst: true,
  });

  sourceFile.organizeImports();
  sourceFile.formatText();

  addToExports(dtoFileInfo.dtoName);

  return true;
};
