import type { Project } from 'ts-morph';

import fs from 'fs-extra';
import path from 'path';

import { logger } from '../../../utils/logger';

export const generateModel = (
  project: Project,
  pascalCaseModelName: string,
  camelCaseModelName: string,
  serverDomainDirPath: string,
  // eslint-disable-next-line no-unused-vars
  addToExports: (exportName: string) => void,
): boolean => {
  const modelPath = path.join(
    serverDomainDirPath,
    `${camelCaseModelName}Model.ts`,
  );

  if (fs.existsSync(modelPath)) {
    logger.warn(
      `Model file already exists at ${modelPath}. Skipping creation.`,
    );
    return false;
  }

  const sourceFile = project.createSourceFile(modelPath);

  // Add type-only import
  sourceFile.addImportDeclaration({
    isTypeOnly: true,
    moduleSpecifier: '~~/generated/prisma/client',
    namedImports: [pascalCaseModelName],
  });

  // Add empty interface with ESLint comment
  sourceFile.addStatements([
    '// eslint-disable-next-line @typescript-eslint/no-empty-object-type',
    `export interface ${pascalCaseModelName}Model extends ${pascalCaseModelName} {}`,
  ]);

  sourceFile.organizeImports();
  sourceFile.formatText();

  addToExports(`${camelCaseModelName}Model`);

  return true;
};
