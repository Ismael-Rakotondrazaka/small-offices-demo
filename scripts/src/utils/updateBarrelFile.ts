import type { Project } from 'ts-morph';

import fs from 'fs-extra';
import path from 'path';

import { getOrCreateSourceFile } from './getOrCreateSourceFile';

export const updateBarrelFile = (
  project: Project,
  barrelFilePath: string,
  modulePaths: string[],
) => {
  fs.ensureDirSync(path.dirname(barrelFilePath));

  const sourceFile = getOrCreateSourceFile(project, barrelFilePath);

  // Get existing namespace exports
  const existingExports = sourceFile
    .getExportDeclarations()
    .filter(dec => dec.isNamespaceExport())
    .map(dec => dec.getModuleSpecifierValue());

  // Add missing exports
  modulePaths.forEach((modulePath) => {
    if (!existingExports.includes(modulePath)) {
      sourceFile.addExportDeclaration({
        moduleSpecifier: modulePath,
      });
    }
  });

  // Add empty export if no exports exist
  if (sourceFile.getExportDeclarations().length === 0) {
    sourceFile.addExportDeclaration({});
  }

  sourceFile.organizeImports();
  sourceFile.formatText();
};
