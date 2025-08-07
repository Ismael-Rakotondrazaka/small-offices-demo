import { Command } from 'commander';

import { action as generateAction } from './generate/action';

const program = new Command();

program
  .name('prisma-scaffold')
  .description('CLI to scaffold Nuxt API files from Prisma models')
  .version('1.0.0');

/* -------------------------------- Generate -------------------------------- */
program
  .command('generate')
  .description('Generate API files for Prisma models')
  .option(
    '-s, --schema <schema>',
    'Prisma schema file path (default: prisma/schema.prisma)',
  )
  .option(
    '-m, --models <models...>',
    'Specific models to generate (comma separated)',
  )
  .option('-e, --exclude <models...>', 'Models to exclude (comma separated)')
  .option('--skip-dto', 'Skip DTO generation')
  .option('--skip-requests', 'Skip request files generation')
  .option('--skip-config', 'Skip config file generation')
  .option('--skip-server', 'Skip server domain files generation')
  .option('--skip-event-handlers', 'Skip event handler files generation')
  .option('--skip-api', 'Skip API route files generation')
  .action(generateAction);

program.parse(process.argv);
