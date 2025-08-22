import { execSync } from 'node:child_process';
import { existsSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { cwd } from 'node:process';

import { dbConfig } from '../../config/dbConfig';

const generateDbInitSql = () => {
  if (existsSync(dbConfig.migrationOutputPath)) return;

  const migrationDir = dirname(dbConfig.migrationOutputPath);
  if (!existsSync(migrationDir)) {
    mkdirSync(migrationDir, { recursive: true });
  }

  const prismaSchemaPath = resolve(cwd(), 'server/services/prisma/schema.prisma');
  execSync(
    `pnpm prisma migrate diff --from-empty --to-schema-datamodel ${prismaSchemaPath} --script > ${dbConfig.migrationOutputPath}`,
  );
};

export const setup = () => {
  generateDbInitSql();
};
