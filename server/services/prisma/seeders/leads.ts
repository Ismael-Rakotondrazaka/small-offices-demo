import { faker } from '@faker-js/faker';

import {
  $Enums,
  type Lead,
  type Prisma,
  type PrismaClient,
} from '../../../../generated/prisma/client';
import { createStringIdentifier } from './identifiers';

const createLeadData = (arg: {
  officeId: string;
  years?: number;
}): Prisma.LeadCreateInput => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = faker.internet.email({ firstName, lastName }).toLowerCase();
  const phone = faker.phone.number({ style: 'international' });
  const status = faker.helpers.enumValue($Enums.LeadStatus);
  const createdAt = faker.date.past({ years: arg.years || 1 });

  return {
    createdAt,
    email,
    id: createStringIdentifier(),
    name: `${firstName} ${lastName}`,
    office: { connect: { id: arg.officeId } },
    phone,
    status,
    updatedAt: createdAt,
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
