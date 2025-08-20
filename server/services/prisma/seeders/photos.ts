import type {
  Photo,
  Prisma,
  PrismaClient,
} from '../../../../generated/prisma/client';

import { faker } from '@faker-js/faker';

import { createStringIdentifier } from './identifiers';

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

const createPhotoData = (arg: {
  officeId: string;
  years?: number;
}): Prisma.PhotoCreateInput => {
  const description = faker.helpers.arrayElement(PHOTO_DESCRIPTIONS);
  const createdAt = faker.date.past({ years: arg.years || 1 });

  return {
    alt: description,
    createdAt,
    id: createStringIdentifier(),
    office: {
      connect: {
        id: arg.officeId,
      },
    },
    url: faker.image.urlPicsumPhotos({ height: 667, width: 1000 }),
  };
};

export const createPhotos = async (arg: {
  offices: { id: string }[];
  prisma: PrismaClient;
  years: number;
}): Promise<Photo[]> => {
  const photosData: Prisma.PhotoCreateInput[] = [];

  for (const office of arg.offices) {
    const photoCount = faker.number.int({ max: 8, min: 3 });

    for (let i = 0; i < photoCount; i++) {
      photosData.push(createPhotoData({
        officeId: office.id,
        years: arg.years,
      }));
    }
  }

  return Promise.all(
    photosData.map(photoData =>
      arg.prisma.photo.create({
        data: photoData,
      }),
    ),
  );
};
