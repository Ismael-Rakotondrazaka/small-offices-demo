import type { Command } from 'commander';

import { parsePrismaSchema } from '@loancrate/prisma-schema-parser';
import fs from 'fs-extra';
import path from 'path';

import { dirConfig } from '../utils/dirConfig';
import { logger } from '../utils/logger';
import { generateFilesForEnum } from './generators/generateFilesForEnum';
import { generateFilesForModel } from './generators/generateFilesForModel';
import { getEnumFolderMap } from './utils/getEnumFolderMap';
import { getEnums, getModels } from './utils/prismaParser';

export const action: Parameters<Command['action']>[0] = async (options) => {
  try {
    const prismaSchemaPath = path.join(
      process.cwd(),
      options.schema ?? dirConfig.PRISMA_SCHEMA_PATH,
    );

    if (!fs.existsSync(prismaSchemaPath)) {
      logger.error(
        `Prisma schema not found at ${options.schema ?? dirConfig.PRISMA_SCHEMA_PATH}`,
      );
      process.exit(1);
    }

    const schemaContent = fs.readFileSync(prismaSchemaPath, 'utf-8');
    const schema = parsePrismaSchema(schemaContent);

    /* ---------------------------------- Enum ---------------------------------- */
    let enumsToProcess = getEnums(schema);

    if (options.models) {
      enumsToProcess = enumsToProcess.filter(model =>
        options.models.includes(model.name),
      );
    }

    if (options.exclude) {
      enumsToProcess = enumsToProcess.filter(
        model => !options.exclude.includes(model.name),
      );
    }

    /* ---------------------------------- Model --------------------------------- */
    const models = getModels(schema);
    let modelsToProcess = [...models];

    if (options.models) {
      modelsToProcess = modelsToProcess.filter(model =>
        options.models.includes(model.name),
      );
    }

    if (options.exclude) {
      modelsToProcess = modelsToProcess.filter(
        model => !options.exclude.includes(model.name),
      );
    }

    /* ------------------------------- Processing ------------------------------- */

    if (enumsToProcess.length + modelsToProcess.length === 0) {
      logger.warn('No models/enums to process');
      return;
    }

    logger.start(
      `Generating files for ${enumsToProcess.length} enums and ${modelsToProcess.length} models ...`,
    );

    if (enumsToProcess.length) {
      const enumFolderNameMap = getEnumFolderMap(
        models.map(model => model.name),
        enumsToProcess.map(enumModel => enumModel.name),
      );

      for (const enumModel of enumsToProcess) {
        await generateFilesForEnum(
          enumModel,
          enumFolderNameMap.get(enumModel.name)!,
        );
        logger.success(
          `Successfully generated files for enum: ${enumModel.name}`,
        );
      }
    }

    for (const model of modelsToProcess) {
      await generateFilesForModel(model, {
        skipApi: options.skipApi,
        skipConfig: options.skipConfig,
        skipDto: options.skipDto,
        skipEventHandlers: options.skipEventHandlers,
        skipRequests: options.skipRequests,
        skipServer: options.skipServer,
      });
      logger.success(`Successfully generated files for model: ${model.name}`);
    }

    logger.success('All files generated successfully!');
  }
  catch (error) {
    if (error instanceof Error) {
      logger.error(`Error: ${error.message}`);
    }
    else {
      logger.error(`Unknown error: ${JSON.stringify(error)}`);
    }

    process.exit(1);
  }
};
