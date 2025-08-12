import fs from 'fs-extra';
import path from 'path';
import { type Project, StructureKind } from 'ts-morph';

import { logger } from '../../../utils/logger';
import {
  type ParsedModel,
  TypeScriptNativeTypes,
} from '../../utils/prismaParser';

export const generateDTOMapper = (
  modelFields: ParsedModel['fields'],
  project: Project,
  pascalCaseModelName: string,
  camelCaseModelName: string,
  serverDomainDirPath: string,
  isNativeTypeOnly: boolean,
  // eslint-disable-next-line no-unused-vars
  addToExports: (exportName: string) => void,
): boolean => {
  const DTOMapperPath = path.join(
    serverDomainDirPath,
    `${camelCaseModelName}DTOMapper.ts`,
  );

  if (fs.existsSync(DTOMapperPath)) {
    logger.warn(
      `DTOMapper file already exists at ${DTOMapperPath}. Skipping creation.`,
    );
    return false;
  }

  const sourceFile = project.createSourceFile(DTOMapperPath);

  sourceFile.addImportDeclaration({
    isTypeOnly: true,
    kind: StructureKind.ImportDeclaration,
    moduleSpecifier: `./${camelCaseModelName}Model`,
    namedImports: [`${pascalCaseModelName}Model`],
  });

  // Add abstract class with static methods
  sourceFile.addClass({
    isAbstract: true,
    isExported: true,
    methods: [
      {
        isStatic: true,
        name: 'toDTO',
        parameters: [{ name: 'model', type: `${pascalCaseModelName}Model` }],
        returnType: `${pascalCaseModelName}DTO`,
        statements: [
          'return {',
          ...modelFields
            .filter((model) => {
              if (!isNativeTypeOnly) {
                return true;
              }

              return (TypeScriptNativeTypes as string[]).includes(model.type);
            })
            .map(field => `  ${field.name}: model.${field.name},`),
          '};',
        ],
      },
      {
        isStatic: true,
        name: 'toDTOs',
        parameters: [{ name: 'models', type: `${pascalCaseModelName}Model[]` }],
        returnType: `${pascalCaseModelName}DTO[]`,
        statements: [
          `return models.map((${camelCaseModelName}) => ${pascalCaseModelName}DTOMapper.toDTO(${camelCaseModelName}));`,
        ],
      },
    ],
    name: `${pascalCaseModelName}DTOMapper`,
  });

  sourceFile.organizeImports();
  sourceFile.formatText();

  addToExports(`${camelCaseModelName}DTOMapper`);

  return true;
};
