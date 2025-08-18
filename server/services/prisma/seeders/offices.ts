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

const PARIS_ARRONDISSEMENTS = [
  { arr: 1, lat: 48.8566, lng: 2.3522, name: 'Louvre' },
  { arr: 2, lat: 48.8674, lng: 2.3414, name: 'Bourse' },
  { arr: 3, lat: 48.8648, lng: 2.3617, name: 'Temple' },
  { arr: 4, lat: 48.8566, lng: 2.3522, name: 'Hôtel-de-Ville' },
  { arr: 5, lat: 48.8462, lng: 2.3439, name: 'Panthéon' },
  { arr: 6, lat: 48.8534, lng: 2.3324, name: 'Luxembourg' },
  { arr: 7, lat: 48.8566, lng: 2.3186, name: 'Palais-Bourbon' },
  { arr: 8, lat: 48.8738, lng: 2.2950, name: 'Élysée' },
  { arr: 9, lat: 48.8800, lng: 2.3376, name: 'Opéra' },
  { arr: 10, lat: 48.8768, lng: 2.3597, name: 'Entrepôt' },
  { arr: 11, lat: 48.8634, lng: 2.3788, name: 'Popincourt' },
  { arr: 12, lat: 48.8404, lng: 2.3955, name: 'Reuilly' },
  { arr: 13, lat: 48.8323, lng: 2.3561, name: 'Gobelins' },
  { arr: 14, lat: 48.8331, lng: 2.3264, name: 'Observatoire' },
  { arr: 15, lat: 48.8412, lng: 2.2976, name: 'Vaugirard' },
  { arr: 16, lat: 48.8634, lng: 2.2769, name: 'Passy' },
  { arr: 17, lat: 48.8837, lng: 2.3214, name: 'Batignolles-Monceau' },
  { arr: 18, lat: 48.8925, lng: 2.3444, name: 'Butte-Montmartre' },
  { arr: 19, lat: 48.8805, lng: 2.3826, name: 'Buttes-Chaumont' },
  { arr: 20, lat: 48.8648, lng: 2.3984, name: 'Ménilmontant' },
];

const getRandomLocationInArrondissement = (arr: number) => {
  const arrondissement = PARIS_ARRONDISSEMENTS.find(a => a.arr === arr);
  if (!arrondissement) {
    return { lat: 48.8566, lng: 2.3522 };
  }

  const latVariation = 0.005;
  const lngVariation = 0.005;

  return {
    lat: faker.number.float({
      fractionDigits: 6,
      max: arrondissement.lat + latVariation,
      min: arrondissement.lat - latVariation,
    }),
    lng: faker.number.float({
      fractionDigits: 6,
      max: arrondissement.lng + lngVariation,
      min: arrondissement.lng - lngVariation,
    }),
  };
};

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

  const SEED_IMAGES = [
    '/images/offices/seeds/office-seed-1.webp',
    '/images/offices/seeds/office-seed-2.webp',
    '/images/offices/seeds/office-seed-3.webp',
    '/images/offices/seeds/office-seed-4.webp',
    '/images/offices/seeds/office-seed-5.webp',
    '/images/offices/seeds/office-seed-6.webp',
    '/images/offices/seeds/office-seed-7.webp',
    '/images/offices/seeds/office-seed-8.webp',
    '/images/offices/seeds/office-seed-9.webp',
    '/images/offices/seeds/office-seed-10.webp',
    '/images/offices/seeds/office-seed-11.webp',
    '/images/offices/seeds/office-seed-12.webp',
    '/images/offices/seeds/office-seed-13.webp',
    '/images/offices/seeds/office-seed-14.webp',
    '/images/offices/seeds/office-seed-15.webp',
    '/images/offices/seeds/office-seed-16.webp',
    '/images/offices/seeds/office-seed-17.webp',
    '/images/offices/seeds/office-seed-18.webp',
    '/images/offices/seeds/office-seed-19.webp',
    '/images/offices/seeds/office-seed-20.webp',
    '/images/offices/seeds/office-seed-21.webp',
    '/images/offices/seeds/office-seed-22.webp',
    '/images/offices/seeds/office-seed-23.webp',
    '/images/offices/seeds/office-seed-24.webp',
    '/images/offices/seeds/office-seed-25.webp',
    '/images/offices/seeds/office-seed-26.webp',
    '/images/offices/seeds/office-seed-27.webp',
    '/images/offices/seeds/office-seed-28.webp',
    '/images/offices/seeds/office-seed-29.webp',
    '/images/offices/seeds/office-seed-30.webp',
    '/images/offices/seeds/office-seed-31.webp',
    '/images/offices/seeds/office-seed-32.webp',
    '/images/offices/seeds/office-seed-33.webp',
    '/images/offices/seeds/office-seed-34.webp',
    '/images/offices/seeds/office-seed-35.webp',
    '/images/offices/seeds/office-seed-36.webp',
    '/images/offices/seeds/office-seed-37.webp',
    '/images/offices/seeds/office-seed-38.webp',
    '/images/offices/seeds/office-seed-39.webp',
    '/images/offices/seeds/office-seed-40.webp',
    '/images/offices/seeds/office-seed-41.webp',
    '/images/offices/seeds/office-seed-42.webp',
    '/images/offices/seeds/office-seed-43.webp',
    '/images/offices/seeds/office-seed-44.webp',
    '/images/offices/seeds/office-seed-45.webp',
    '/images/offices/seeds/office-seed-46.webp',
    '/images/offices/seeds/office-seed-47.webp',
  ];

  return {
    data: faker.helpers.multiple(() => {
      const description = faker.helpers.arrayElement(PHOTO_DESCRIPTIONS);
      const imageUrl = faker.helpers.arrayElement(SEED_IMAGES);
      return {
        alt: description,
        createdAt: arg.createdAt,
        id: createStringIdentifier(),
        url: imageUrl,
      };
    }),
  };
};

const createOfficeData = (arg: {
  arr?: number;
  isFake?: boolean;
  services: Service[];
  type?: $Enums.OfficeType;
  years?: number;
}): Prisma.OfficeCreateInput => {
  const title = faker.company.buzzPhrase();
  const arrondissement = arg.arr
    ? PARIS_ARRONDISSEMENTS.find(a => a.arr === arg.arr) || faker.helpers.arrayElement(PARIS_ARRONDISSEMENTS)
    : faker.helpers.arrayElement(PARIS_ARRONDISSEMENTS);
  const arr = arrondissement.arr;
  const { lat, lng } = getRandomLocationInArrondissement(arr);
  const price = faker.number.float({ max: 150000, min: 500, multipleOf: 100 });
  const type = arg.type ?? faker.helpers.enumValue($Enums.OfficeType);
  const posts = faker.number.int({ max: 50, min: 1 });
  const createdAt = faker.date.past({ years: arg.years || 1 });
  const isFake = arg.isFake ?? faker.datatype.boolean({ probability: 0.2 });

  return {
    arr,
    createdAt,
    id: createStringIdentifier(),
    isFake,
    lat,
    lng,
    photos: {
      createMany: createPhotos({ createdAt }),
    },
    posts,
    price,
    services: {
      connect: arg.services.map(service => ({ id: service.id })),
    },
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
  const officesData: Prisma.OfficeCreateInput[] = [];

  PARIS_ARRONDISSEMENTS.forEach((arrondissement) => {
    for (const type of Object.values($Enums.OfficeType)) {
      if (type === $Enums.OfficeType.INDEPENDENT_SPACE) continue;

      officesData.push(
        ...faker.helpers.multiple(
          () => createOfficeData(
            {
              arr: arrondissement.arr,
              services: arg.services,
              type,
              years: arg.years,
            },
          ),
          {
            count: {
              max: 20,
              min: 5,
            },
          }),
      );
    }
  });

  return Promise.all(
    officesData.map(officeData =>
      arg.prisma.office.create({
        data: officeData,
      }),
    ),
  );
};
