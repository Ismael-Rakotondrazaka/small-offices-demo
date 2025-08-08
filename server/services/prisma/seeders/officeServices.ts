import type {
  OfficeService,
  Prisma,
  PrismaClient,
} from '~~/generated/prisma/client';

import { faker } from '@faker-js/faker';

import { createStringIdentifier } from './identifiers';

const createOfficeServiceData = (arg: {
  officeId: string;
  serviceId: string;
  years?: number;
}): Prisma.OfficeServiceCreateInput => {
  const createdAt = faker.date.past({ years: arg.years || 1 });

  return {
    createdAt,
    id: createStringIdentifier(),
    office: { connect: { id: arg.officeId } },
    service: { connect: { id: arg.serviceId } },
  };
};

export const createOfficeServices = async (arg: {
  offices: { id: string }[];
  prisma: PrismaClient;
  services: { id: string }[];
  years: number;
}): Promise<OfficeService[]> => {
  const officeServicesData: Prisma.OfficeServiceCreateInput[] = [];

  for (const office of arg.offices) {
    const serviceCount = faker.number.int({ max: 8, min: 3 });
    const selectedServices = faker.helpers.arrayElements(arg.services, { max: serviceCount, min: 3 });

    for (const service of selectedServices) {
      officeServicesData.push(createOfficeServiceData({
        officeId: office.id,
        serviceId: service.id,
        years: arg.years,
      }));
    }
  }

  return Promise.all(
    officeServicesData.map(officeServiceData =>
      arg.prisma.officeService.create({
        data: officeServiceData,
      }),
    ),
  );
};
