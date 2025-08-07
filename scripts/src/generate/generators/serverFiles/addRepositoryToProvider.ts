import type { ClassDeclaration, Project } from 'ts-morph';

import fs from 'fs-extra';
import path from 'path';
import { Scope, StructureKind } from 'ts-morph';

import { getOrCreateSourceFile } from '../../../utils/getOrCreateSourceFile';

// 1. Type Definitions
type RepositoryConfig = {
  instanceImport: string;
  name: string;
  type: string;
};

// 2. Configuration
const REPOSITORY_PROVIDER_CONFIG = {
  abstract: true,
  className: 'RepositoryProvider',
};

const PRISMA_PROVIDER_CONFIG = {
  className: 'PrismaProvider',
  instanceImport: '~~/server/services/prisma/prismaProvider',
};

// 3. Helper Functions
function addRepositoryGetter(
  classDecl: ClassDeclaration,
  repo: RepositoryConfig,
) {
  const privateField = `#${repo.name}`;

  // Add private static field
  if (!classDecl.getProperty(privateField)) {
    classDecl.addProperty({
      isStatic: true,
      name: privateField,
      type: repo.type,
    });
  }

  // Add public getter
  if (!classDecl.getGetAccessor(`get ${repo.name}`)) {
    classDecl.addGetAccessor({
      isStatic: true,
      name: repo.name,
      returnType: repo.type,
      scope: Scope.Public,
      statements: [
        `if (!this.${privateField}) {`,
        `  this.${privateField} = new ${repo.type}(${PRISMA_PROVIDER_CONFIG.className}.instance);`,
        `}`,
        `return this.${privateField};`,
      ],
    });
  }
}

const REPOSITORY_PROVIDER_PATH
  = 'server/services/repositories/repositoryProvider.ts';

// 4. Main Generator Function
export function addRepositoryToProvider(
  project: Project,
  repository: RepositoryConfig,
) {
  const repositoryProviderPath = path.join(
    process.cwd(),
    REPOSITORY_PROVIDER_PATH,
  );

  fs.ensureDirSync(path.dirname(repositoryProviderPath));

  const sourceFile = getOrCreateSourceFile(project, repositoryProviderPath);

  const isAlreadyImported
    = sourceFile.getImportDeclaration(
      imp => imp.getModuleSpecifierValue() === repository.instanceImport,
    ) !== undefined;

  if (!isAlreadyImported) {
    sourceFile.addImportDeclaration({
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: repository.instanceImport,
      namedImports: [repository.type],
    });
  }

  sourceFile.addImportDeclaration({
    moduleSpecifier: PRISMA_PROVIDER_CONFIG.instanceImport,
    namedImports: [PRISMA_PROVIDER_CONFIG.className],
  });

  // Get or create the class
  let classDecl = sourceFile.getClass(REPOSITORY_PROVIDER_CONFIG.className);
  if (!classDecl) {
    classDecl = sourceFile.addClass({
      isAbstract: REPOSITORY_PROVIDER_CONFIG.abstract,
      name: REPOSITORY_PROVIDER_CONFIG.className,
    });
  }

  // Add repository getter
  addRepositoryGetter(classDecl, repository);

  // Format
  sourceFile.organizeImports();
  sourceFile.formatText();
}
