import type { Project } from 'ts-morph';

import { camelCase } from 'change-case';
import fs from 'fs-extra';
import path from 'path';
import pluralize from 'pluralize';
import { VariableDeclarationKind } from 'ts-morph';

import type { ParsedModel } from '../utils/prismaParser';

import { logger } from '../../utils/logger';

const DOMAINS_PATH = 'shared/domains';

export const generateConfigFile = async (
  model: ParsedModel,
  project: Project,
  // eslint-disable-next-line no-unused-vars
  addToExports: (exportName: string) => void,
): Promise<boolean> => {
  logger.info(`Generating config file for model: ${model.name}`);

  const camelCaseModelName = camelCase(model.name);
  const folderName = pluralize(camelCaseModelName);
  const name = `${camelCaseModelName}Config`;
  const filename = `${name}.ts`;

  const configPath = path.join(
    process.cwd(),
    DOMAINS_PATH,
    folderName,
    filename,
  );

  if (fs.existsSync(configPath)) {
    logger.warn(
      `Config file already exists at ${configPath}. Skipping creation.`,
    );
    return false;
  }

  const sourceFile = project.createSourceFile(configPath);

  sourceFile.addVariableStatement({
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        initializer: `{ PAGE_SIZE_DEFAULT_VALUE: 50 }`,
        name,
      },
    ],
    isExported: true,
  });

  sourceFile.organizeImports();
  sourceFile.formatText();
  addToExports(name);

  return true;
};
