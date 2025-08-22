import { resolve } from 'node:path';
import { cwd } from 'node:process';

export const dbConfig = Object.freeze({
  migrationOutputPath: resolve(cwd(), 'tmp/migration.sql'),
});
