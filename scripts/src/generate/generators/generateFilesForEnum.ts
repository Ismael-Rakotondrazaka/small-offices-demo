import { camelCase, pascalCase } from 'es-toolkit';
import fs from 'fs-extra';
import path from 'path';
import { Project, VariableDeclarationKind } from 'ts-morph';

import type { ParsedEnum } from '../utils/prismaParser';

import { dirConfig } from '../../utils/dirConfig';
import { logger } from '../../utils/logger';
import { updateBarrelFile } from '../../utils/updateBarrelFile';

export const generateFilesForEnum = async (
  parsedEnum: ParsedEnum,
  folderName: string,
) => {
  logger.info(`Generating enum file for enum: ${parsedEnum.name}`);

  const camelCaseEnumName = camelCase(parsedEnum.name);
  const pascalCaseEnumName = pascalCase(parsedEnum.name);

  const project = new Project();

  const sharedDomainPath = path.join(
    process.cwd(),
    dirConfig.SHARED_DOMAINS_PATH,
    folderName,
  );

  await fs.ensureDir(sharedDomainPath);

  const filePath = path.join(sharedDomainPath, `${camelCaseEnumName}.ts`);

  if (fs.existsSync(filePath)) {
    logger.warn(`Enum file already exists at ${filePath}. Skipping creation.`);
    return false;
  }

  const sourceFile = project.createSourceFile(filePath);

  sourceFile.addImportDeclaration({
    moduleSpecifier: 'zod',
    namedImports: ['z'],
  });

  // Add enum object
  sourceFile.addVariableStatement({
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        initializer: (writer) => {
          writer.write('{');
          parsedEnum.values.forEach((val, idx) => {
            writer.write(`${val}: "${val}"`);
            if (idx < parsedEnum.values.length - 1) writer.write(', ');
          });
          writer.write('} as const');
        },
        name: pascalCaseEnumName,
      },
    ],
    isExported: true,
  });

  // Add type
  sourceFile.addTypeAlias({
    isExported: true,
    name: pascalCaseEnumName,
    type: `(typeof ${pascalCaseEnumName})[keyof typeof ${pascalCaseEnumName}]`,
  });

  // Add schema
  sourceFile.addVariableStatement({
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        initializer: `z.nativeEnum(${pascalCaseEnumName})`,
        name: `${pascalCaseEnumName}Schema`,
      },
    ],
    isExported: true,
  });

  updateBarrelFile(
    project,
    path.join(
      process.cwd(),
      dirConfig.SHARED_DOMAINS_PATH,
      folderName,
      'index.ts',
    ),
    [`./${camelCaseEnumName}`],
  );

  updateBarrelFile(
    project,
    path.join(process.cwd(), dirConfig.SHARED_DOMAINS_PATH, 'index.ts'),
    [`./${folderName}`],
  );

  updateBarrelFile(project, path.join(process.cwd(), 'shared', 'index.ts'), [
    './domains',
  ]);

  updateBarrelFile(
    project,
    path.join(process.cwd(), 'app', 'utils', 'index.ts'),
    ['../../shared'],
  );

  await project.save();
};
