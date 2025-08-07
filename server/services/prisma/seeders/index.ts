// We use nested imports to avoid interference with Nuxt ecosystem
import { PrismaClient } from '../../../../generated/prisma/client';
import { createPosts } from './posts';
import { createProfileImages } from './profileImages';
import { createUsers } from './users';

const prismaClient = new PrismaClient();

const main = async () => {
  const simulationYears: number = 2;

  console.time('=> Total seed duration');

  /* ---------------------------------- Users --------------------------------- */
  console.time('Users seed duration');

  const users = await createUsers({
    prisma: prismaClient,
    years: simulationYears,
  });

  console.timeEnd('Users seed duration');

  /* ------------------------------ ProfileImages ----------------------------- */
  console.time('ProfileImages seed duration');

  await createProfileImages({
    prisma: prismaClient,
    users,
  });

  console.timeEnd('ProfileImages seed duration');

  /* ---------------------------------- Post ---------------------------------- */
  console.time('Posts seed duration');

  await createPosts({
    prisma: prismaClient,
    users,
  });

  console.timeEnd('Posts seed duration');

  console.timeEnd('=> Total seed duration');
};

main()
  .then(async () => {
    await prismaClient.$disconnect();
  })

  .catch(async (e) => {
    console.error(e);

    await prismaClient.$disconnect();

    process.exit(1);
  });
