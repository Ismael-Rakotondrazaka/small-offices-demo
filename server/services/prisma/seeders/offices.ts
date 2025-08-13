import type {
  Office,
  Prisma,
  PrismaClient,
  Service } from '~~/generated/prisma/client';

import { faker } from '@faker-js/faker';
import {
  $Enums,
} from '~~/generated/prisma/client';

import { createStringIdentifier } from './identifiers';

const createPhotos = (
  arg: { createdAt?: Date },
): Prisma.PhotoCreateManyOfficeInputEnvelope => {
  const PHOTO_DESCRIPTIONS = [
    'Bureau moderne avec vue sur la ville',
    'Espace de coworking lumineux',
    'Salle de réunion équipée',
    'Zone de détente avec canapés',
    'Cuisine commune',
    'Réception professionnelle',
    'Terrasse avec vue panoramique',
    'Bureau privatif avec mobilier design',
    'Open space avec postes de travail',
    'Salle de conférence avec écran',
    'Espace café avec machine à café',
    'Parking sécurisé',
    'Hall d\'entrée avec gardien',
    'Bureau avec balcon',
    'Espace détente avec jeux',
  ];

  return {
    data: faker.helpers.multiple(() => {
      const description = faker.helpers.arrayElement(PHOTO_DESCRIPTIONS);
      return {
        alt: description,
        createdAt: arg.createdAt,
        id: createStringIdentifier(),
        url: faker.image.urlPicsumPhotos({ height: 667, width: 1000 }),
      };
    }),
  };
};

const createOfficeServices = (
  arg: {
    createdAt?: Date;
    services: Service[];
  },
): Prisma.OfficeServiceCreateManyOfficeInputEnvelope => {
  return {
    data: faker.helpers.arrayElements(arg.services).map(service => ({
      createdAt: faker.date.soon({
        refDate: arg.createdAt,
      }),
      serviceId: service.id,
    })),
  };
};

const createOfficeData = (arg: {
  isFake?: boolean;
  services: Service[];
  years?: number;
}): Prisma.OfficeCreateInput => {
  const title = faker.company.name();
  const arr = faker.number.int({ max: 20, min: 1 });
  const price = faker.number.float({ fractionDigits: 2, max: 1500, min: 300 });
  const type = faker.helpers.enumValue($Enums.OfficeType);
  const posts = faker.number.int({ max: 50, min: 1 });
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
    officeServices: {
      createMany: createOfficeServices({ createdAt, services: arg.services }),
    },
    photos: {
      createMany: createPhotos({ createdAt }),
    },
    posts,
    price,
    slug: faker.helpers.slugify(title).toLowerCase(),
    title,
    type,
    updatedAt: createdAt,
  };
};

export const createOffices = async (arg: {
  prisma: PrismaClient;
  services: Service[];
  years: number;
}): Promise<Office[]> => {
  const officesData: Prisma.OfficeCreateInput[] = faker.helpers.multiple(
    () => createOfficeData({ services: arg.services, years: arg.years }),
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
