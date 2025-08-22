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

  console.time('User Roles & Services seed duration');
  const [userRoles, services] = await Promise.all([
    createUserRoles({
      count: 5,
      prisma: prismaClient,
    }),
    createServices({
      prisma: prismaClient,
      years: simulationYears,
    }),
  ]);
  console.timeEnd('User Roles & Services seed duration');

  console.time('Offices seed duration');
  const offices = await createOffices({
    prisma: prismaClient,
    services,
    years: simulationYears,
  });
  console.timeEnd('Offices seed duration');

  console.time('Leads & Audit Logs seed duration');
  const [leads] = await Promise.all([
    createLeads({
      offices,
      prisma: prismaClient,
      years: simulationYears,
    }),
    createAuditLogs({
      auditLogsPerEntity: 3,
      leads: [],
      offices,
      prisma: prismaClient,
      services,
      userRoles,
      years: simulationYears,
    }),
  ]);

  await createAuditLogs({
    auditLogsPerEntity: 3,
    leads,
    offices,
    prisma: prismaClient,
    services,
    userRoles,
    years: simulationYears,
  });
  console.timeEnd('Leads & Audit Logs seed duration');

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
