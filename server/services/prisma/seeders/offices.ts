import type {
  Office,
  Prisma,
  PrismaClient,
} from '~~/generated/prisma/client';

import { faker } from '@faker-js/faker';

import { createStringIdentifier } from './identifiers';

const PARIS_ARRONDISSEMENTS = [
  '75001', '75002', '75003', '75004', '75005', '75006', '75007', '75008', '75009', '75010',
  '75011', '75012', '75013', '75014', '75015', '75016', '75017', '75018', '75019', '75020',
];

const OFFICE_TYPES = [
  'Bureau privatif',
  'Bureau partagé',
  'Espace de coworking',
  'Salle de réunion',
  'Bureau en open space',
  'Cabinet individuel',
];

const SERVICES_DATA = [
  { icon: 'wifi', name: 'WiFi' },
  { icon: 'printer', name: 'Imprimante' },
  { icon: 'users', name: 'Salle de réunion' },
  { icon: 'coffee', name: 'Café' },
  { icon: 'car', name: 'Parking' },
  { icon: 'shield', name: 'Sécurité 24/7' },
  { icon: 'user-check', name: 'Réception' },
  { icon: 'thermometer', name: 'Climatisation' },
  { icon: 'sun', name: 'Terrasse' },
  { icon: 'utensils', name: 'Cuisine' },
];

const createOfficeData = (arg: {
  isFake?: boolean;
  years?: number;
}): Prisma.OfficeCreateInput => {
  const title = faker.helpers.arrayElement(OFFICE_TYPES);
  const arr = faker.helpers.arrayElement(PARIS_ARRONDISSEMENTS);
  const priceCents = faker.number.int({ max: 150000, min: 30000 });
  const posts = faker.number.int({ max: 10, min: 1 }).toString();
  const services = faker.helpers.arrayElements(SERVICES_DATA, { max: 7, min: 3 });
  const lat = faker.location.latitude({ max: 48.9, min: 48.8 });
  const lng = faker.location.longitude({ max: 2.4, min: 2.3 });
  const createdAt = faker.date.past({ years: arg.years || 1 });
  const isFake = arg.isFake ?? faker.datatype.boolean({ probability: 0.2 });

  return {
    arr,
    createdAt,
    id: createStringIdentifier(),
    isFake,
    lat,
    lng,
    posts,
    priceCents,
    services,
    slug: faker.helpers.slugify(title).toLowerCase(),
    title,
    updatedAt: createdAt,
  };
};

export const createOffices = async (arg: {
  prisma: PrismaClient;
  years: number;
}): Promise<Office[]> => {
  const officesData: Prisma.OfficeCreateInput[] = faker.helpers.multiple(
    () => createOfficeData({ years: arg.years }),
    {
      count: {
        max: 50,
        min: 20,
      },
    },
  );

  return Promise.all(
    officesData.map(officeData =>
      arg.prisma.office.create({
        data: officeData,
      }),
    ),
  );
};
