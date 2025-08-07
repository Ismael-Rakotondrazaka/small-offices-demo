import type { Project, SourceFile } from 'ts-morph';

import fs from 'fs-extra';

export const getOrCreateSourceFile = (
  project: Project,
  filePath: string,
): SourceFile => {
  const existingSourceFile = project.getSourceFile(filePath);
  if (existingSourceFile) {
    return existingSourceFile;
  }

  return fs.existsSync(filePath)
    ? project.addSourceFileAtPath(filePath)
    : project.createSourceFile(filePath);
};
