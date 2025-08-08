import type {
  Lead,
  Prisma,
  PrismaClient,
} from '~~/generated/prisma/client';

import { faker } from '@faker-js/faker';

import { createStringIdentifier } from './identifiers';

const LEAD_STATUSES = ['PENDING', 'CONTACTED', 'CONVERTED', 'LOST'] as const;

const UTM_SOURCES = [
  'google',
  'facebook',
  'linkedin',
  'direct',
  'email',
  'referral',
  'organic',
];

const UTM_MEDIUMS = [
  'cpc',
  'social',
  'email',
  'banner',
  'organic',
  'referral',
];

const createLeadData = (arg: {
  officeId: string;
  years?: number;
}): Prisma.LeadCreateInput => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = faker.internet.email({ firstName, lastName }).toLowerCase();
  const phone = faker.phone.number({ style: 'international' });
  const status = faker.helpers.arrayElement(LEAD_STATUSES);
  const createdAt = faker.date.past({ years: arg.years || 1 });

  const utmJson = {
    campaign: faker.helpers.arrayElement(['summer2024', 'winter2024', 'spring2024', 'autumn2024']),
    content: faker.helpers.arrayElement(['header', 'sidebar', 'footer', 'popup']),
    medium: faker.helpers.arrayElement(UTM_MEDIUMS),
    source: faker.helpers.arrayElement(UTM_SOURCES),
    term: faker.helpers.arrayElement(['bureau paris', 'coworking', 'espace de travail', 'bureau privatif']),
  };

  return {
    createdAt,
    email,
    id: createStringIdentifier(),
    name: `${firstName} ${lastName}`,
    office: { connect: { id: arg.officeId } },
    phone,
    status,
    updatedAt: createdAt,
    utmJson,
  };
};

export const createLeads = async (arg: {
  offices: { id: string }[];
  prisma: PrismaClient;
  years: number;
}): Promise<Lead[]> => {
  const leadsData: Prisma.LeadCreateInput[] = [];

  for (const office of arg.offices) {
    const leadCount = faker.number.int({ max: 5, min: 0 });

    for (let i = 0; i < leadCount; i++) {
      leadsData.push(createLeadData({
        officeId: office.id,
        years: arg.years,
      }));
    }
  }

  return Promise.all(
    leadsData.map(leadData =>
      arg.prisma.lead.create({
        data: leadData,
      }),
    ),
  );
};
