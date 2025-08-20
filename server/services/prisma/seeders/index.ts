// We use nested imports to avoid interference with Nuxt ecosystem
import { PrismaClient } from '../../../../generated/prisma/client';
import { createAuditLogs } from './auditLogs';
import { createLeads } from './leads';
import { createOffices } from './offices';
import { createServices } from './services';
import { createUserRoles } from './userRoles';

const prismaClient = new PrismaClient();

const main = async () => {
  const simulationYears: number = 2;

  console.time('=> Total seed duration');

  /* --------------------------------- User Roles -------------------------------- */
  console.time('User Roles seed duration');

  const userRoles = await createUserRoles({
    count: 5,
    prisma: prismaClient,
  });

  console.timeEnd('User Roles seed duration');

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
    services,
    years: simulationYears,
  });

  console.timeEnd('Offices seed duration');

  /* ---------------------------------- Leads ---------------------------------- */
  console.time('Leads seed duration');

  const leads = await createLeads({
    offices,
    prisma: prismaClient,
    years: simulationYears,
  });

  console.timeEnd('Leads seed duration');

  /* --------------------------------- Audit Logs -------------------------------- */
  console.time('Audit Logs seed duration');

  await createAuditLogs({
    auditLogsPerEntity: 3,
    leads,
    offices,
    prisma: prismaClient,
    services,
    userRoles,
    years: simulationYears,
  });

  console.timeEnd('Audit Logs seed duration');

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
