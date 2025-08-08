// We use nested imports to avoid interference with Nuxt ecosystem
import { PrismaClient } from '../../../../generated/prisma/client';
import { createLeads } from './leads';
import { createOffices } from './offices';
import { createOfficeServices } from './officeServices';
import { createPhotos } from './photos';
import { createServices } from './services';

const prismaClient = new PrismaClient();

const main = async () => {
  const simulationYears: number = 2;

  console.time('=> Total seed duration');

  /* --------------------------------- Services -------------------------------- */
  console.time('Services seed duration');

  const services = await createServices({
    prisma: prismaClient,
    years: simulationYears,
  });

  console.timeEnd('Services seed duration');

  /* --------------------------------- Offices --------------------------------- */
  console.time('Offices seed duration');

  const offices = await createOffices({
    prisma: prismaClient,
    years: simulationYears,
  });

  console.timeEnd('Offices seed duration');

  /* ------------------------------ OfficeServices ----------------------------- */
  console.time('OfficeServices seed duration');

  await createOfficeServices({
    offices,
    prisma: prismaClient,
    services,
    years: simulationYears,
  });

  console.timeEnd('OfficeServices seed duration');

  /* --------------------------------- Photos ---------------------------------- */
  console.time('Photos seed duration');

  await createPhotos({
    offices,
    prisma: prismaClient,
    years: simulationYears,
  });

  console.timeEnd('Photos seed duration');

  /* ---------------------------------- Leads ---------------------------------- */
  console.time('Leads seed duration');

  await createLeads({
    offices,
    prisma: prismaClient,
    years: simulationYears,
  });

  console.timeEnd('Leads seed duration');

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
