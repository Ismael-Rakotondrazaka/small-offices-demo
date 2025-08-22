import { MemoryFS, PGlite } from '@electric-sql/pglite';
import { readFileSync } from 'node:fs';
import { PrismaPGlite } from 'pglite-prisma-adapter';
import { afterAll, beforeAll, vi } from 'vitest';

import { PrismaClient } from '../../generated/prisma/client';
import { dbConfig } from '../config/dbConfig';

const getSchemaSql = () => {
  return readFileSync(dbConfig.migrationOutputPath, 'utf-8');
};

let db: PGlite;
let prisma: PrismaClient;

beforeAll(async () => {
  db = new PGlite({
    // In-memory mode for full isolation
    fs: new MemoryFS(),
  });

  await db.exec(getSchemaSql()); // Apply schema SQL
  prisma = new PrismaClient({ adapter: new PrismaPGlite(db) });

  // Mock PrismaProvider.instance to return the test prisma
  vi.mock('../../server/services/prisma/prismaProvider', () => {
    const prismaClientFactory = () => prisma;

    return {
      prismaClientFactory,
      PrismaProvider: {
        get instance() {
          return prisma;
        },
      },
    };
  });
});

afterAll(async () => {
  await prisma.$disconnect();
  await db.close();
  vi.clearAllMocks();
});
