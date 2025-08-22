import { camelCase } from 'es-toolkit';
import fs from 'fs-extra';
import path from 'path';
import pluralize from 'pluralize';
import { Project } from 'ts-morph';

import type { ParsedModel } from '../utils/prismaParser';

import { dirConfig } from '../../utils/dirConfig';
import { updateBarrelFile } from '../../utils/updateBarrelFile';
import { generateApiFiles } from './generateApiFiles';
import { generateConfigFile } from './generateConfigFile';
import { generateDto } from './generateDto';
import { generateEventHandlers } from './generateEventHandlers';
import { generateRequestFiles } from './generateRequestFiles';
import { generateServerFiles } from './generateServerFiles';

interface GenerateOptions {
  skipApi?: boolean;
  skipConfig?: boolean;
  skipDto?: boolean;
  skipEventHandlers?: boolean;
  skipRequests?: boolean;
  skipServer?: boolean;
}

export async function generateFilesForModel(
  model: ParsedModel,
  options: GenerateOptions = {},
) {
  const camelCaseModelName = camelCase(model.name);
  const folderName = pluralize(camelCaseModelName);

  const project = new Project();

  const sharedExports: Set<string> = new Set<string>();
  const addToSharedExports = (exportName: string) => {
    if (!sharedExports.has(exportName)) {
      sharedExports.add(exportName);
    }
  };

  // Create the shared domain directory
  if (options.skipConfig && options.skipDto && options.skipRequests) {
    const sharedDomainPath = path.join(
      process.cwd(),
      dirConfig.SHARED_DOMAINS_PATH,
      folderName,
    );

    await fs.ensureDir(sharedDomainPath);
  }

  if (!options.skipConfig) {
    await generateConfigFile(model, project, addToSharedExports);
  }

  if (!options.skipDto) {
    await generateDto(model, project, addToSharedExports);
  }

  if (!options.skipRequests) {
    await generateRequestFiles(model, project, addToSharedExports);
  }

  if (sharedExports.size > 0) {
    const domainPath = path.join(
      process.cwd(),
      dirConfig.SHARED_DOMAINS_PATH,
      folderName,
      'index.ts',
    );

    updateBarrelFile(
      project,
      domainPath,
      Array.from(sharedExports.values()).map(exportName => `./${exportName}`),
    );

    const indexPath = path.join(
      process.cwd(),
      dirConfig.SHARED_DOMAINS_PATH,
      'index.ts',
    );

    updateBarrelFile(project, indexPath, [`./${folderName}`]);

    updateBarrelFile(project, path.join(process.cwd(), 'shared', 'index.ts'), [
      './domains',
    ]);

    updateBarrelFile(
      project,
      path.join(process.cwd(), 'app', 'utils', 'index.ts'),
      ['../../shared'],
    );
  }

  if (!options.skipServer) {
    const serverDomainPath = path.join(
      process.cwd(),
      dirConfig.SERVER_DOMAINS_PATH,
      folderName,
    );
    await fs.ensureDir(serverDomainPath);

    const serverExports: Set<string> = new Set<string>();
    const addToServerExports = (exportName: string) => {
      if (!serverExports.has(exportName)) {
        serverExports.add(exportName);
      }
    };

    await generateServerFiles(model, project, addToServerExports);

    updateBarrelFile(
      project,
      path.join(serverDomainPath, 'index.ts'),
      Array.from(serverExports.values()).map(exportName => `./${exportName}`),
    );

    updateBarrelFile(
      project,
      path.join(process.cwd(), dirConfig.SERVER_DOMAINS_PATH, 'index.ts'),
      [`./${folderName}`],
    );

    updateBarrelFile(
      project,
      path.join(process.cwd(), 'server', 'utils', 'index.ts'),
      ['../domains'],
    );
  }

  if (!options.skipEventHandlers) {
    const serverDomainPath = path.join(
      process.cwd(),
      dirConfig.SERVER_DOMAINS_PATH,
      folderName,
    );
    await fs.ensureDir(serverDomainPath);

    const serverExports: Set<string> = new Set<string>();
    const addToServerExports = (exportName: string) => {
      if (!serverExports.has(exportName)) {
        serverExports.add(exportName);
      }
    };

    await generateEventHandlers(model, project, addToServerExports);

    updateBarrelFile(
      project,
      path.join(serverDomainPath, 'index.ts'),
      Array.from(serverExports.values()).map(exportName => `./${exportName}`),
    );

    updateBarrelFile(
      project,
      path.join(process.cwd(), dirConfig.SERVER_DOMAINS_PATH, 'index.ts'),
      [`./${folderName}`],
    );

    updateBarrelFile(
      project,
      path.join(process.cwd(), 'server', 'utils', 'index.ts'),
      ['../domains'],
    );
  }

  if (!options.skipApi) {
    const apiDomainPath = path.join(
      process.cwd(),
      dirConfig.APIS_PATH,
      folderName,
    );
    await fs.ensureDir(apiDomainPath);

    await generateApiFiles(model, project);
  }

  await project.save();
}
