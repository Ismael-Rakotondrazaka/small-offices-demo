import { execSync } from 'child_process';

/**
 * Helper to reset the database via a programmatic prisma invocation. Helpful to add to \`beforeEach\` or \`beforeAll\` of your testing setup.
 *
 * WARNING: Never run this in production.
 *
 * Taken from https://github.com/prisma/prisma/issues/13549#issuecomment-1144883246
 *
 * @param databaseUrl Connection URL to database. Inferred from \`process.env.DATABASE_URL\` if not provided
 */
export const resetDatabase = (databaseUrl: string) => {
  if (process.platform === 'win32') {
    // For Windows, set the environment variable separately
    execSync(
      `cd ${process.cwd()} && set DATABASE_URL=${databaseUrl} && pnpm prisma migrate reset --force`,
      {
        stdio: 'inherit',
      },
    );
  }
  else {
    // For Unix-based systems
    execSync(
      `cd ${process.cwd()} && DATABASE_URL=${databaseUrl} pnpm prisma migrate reset --force`,
      {
        stdio: 'inherit',
      },
    );
  }
};

export const seedDatabase = (databaseUrl: string) => {
  if (!databaseUrl) {
    throw new Error(
      'Cannot reset database - connection string could not be inferred.',
    );
  }

  if (process.platform === 'win32') {
    // For Windows, set the environment variable separately
    execSync(
      `cd ${process.cwd()} && set DATABASE_URL=${databaseUrl} && pnpm tsx server/services/prisma/seeders/index.ts`,
      {
        stdio: 'inherit',
      },
    );
  }
  else {
    // For Unix-based systems
    execSync(`cd ${process.cwd()} && DATABASE_URL=${databaseUrl} pnpm tsx server/services/prisma/seeders/index.ts`, {
      stdio: 'inherit',
    });
  }
};
