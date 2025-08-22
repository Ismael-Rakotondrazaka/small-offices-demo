import { faker } from '@faker-js/faker';

import type {
  Office,
  Prisma,
  PrismaClient,
  Service } from '../../../../generated/prisma/client';

import {
  $Enums,
} from '../../../../generated/prisma/client';
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
  'https://images.unsplash.com/photo-1556761175-4b46a572b786?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3OTQzMTV8MHwxfHNlYXJjaHwxfHxvZmZpY2VzfGVufDB8fHx8MTc1NTcwOTAxMHww&ixlib=rb-4.1.0&q=80&w=400',
  'https://images.unsplash.com/photo-1554232456-8727aae0cfa4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3OTQzMTV8MHwxfHNlYXJjaHwyfHxvZmZpY2VzfGVufDB8fHx8MTc1NTcwOTAxMHww&ixlib=rb-4.1.0&q=80&w=400',
  'https://images.unsplash.com/photo-1571624436279-b272aff752b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3OTQzMTV8MHwxfHNlYXJjaHwzfHxvZmZpY2VzfGVufDB8fHx8MTc1NTcwOTAxMHww&ixlib=rb-4.1.0&q=80&w=400',
  'https://images.unsplash.com/photo-1531973576160-7125cd663d86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3OTQzMTV8MHwxfHNlYXJjaHw0fHxvZmZpY2VzfGVufDB8fHx8MTc1NTcwOTAxMHww&ixlib=rb-4.1.0&q=80&w=400',
  'https://images.unsplash.com/photo-1497366754035-f200968a6e72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3OTQzMTV8MHwxfHNlYXJjaHw1fHxvZmZpY2VzfGVufDB8fHx8MTc1NTcwOTAxMHww&ixlib=rb-4.1.0&q=80&w=400',
  'https://images.unsplash.com/photo-1497366811353-6870744d04b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3OTQzMTV8MHwxfHNlYXJjaHw2fHxvZmZpY2VzfGVufDB8fHx8MTc1NTcwOTAxMHww&ixlib=rb-4.1.0&q=80&w=400',
  'https://images.unsplash.com/photo-1517502884422-41eaead166d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3OTQzMTV8MHwxfHNlYXJjaHw3fHxvZmZpY2VzfGVufDB8fHx8MTc1NTcwOTAxMHww&ixlib=rb-4.1.0&q=80&w=400',
  'https://images.unsplash.com/photo-1549637642-90187f64f420?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3OTQzMTV8MHwxfHNlYXJjaHw4fHxvZmZpY2VzfGVufDB8fHx8MTc1NTcwOTAxMHww&ixlib=rb-4.1.0&q=80&w=400',
  'https://images.unsplash.com/photo-1524758631624-e2822e304c36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3OTQzMTV8MHwxfHNlYXJjaHw5fHxvZmZpY2VzfGVufDB8fHx8MTc1NTcwOTAxMHww&ixlib=rb-4.1.0&q=80&w=400',
  'https://images.unsplash.com/photo-1577412647305-991150c7d163?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3OTQzMTV8MHwxfHNlYXJjaHwxMHx8b2ZmaWNlc3xlbnwwfHx8fDE3NTU3MDkwMTB8MA&ixlib=rb-4.1.0&q=80&w=400',
  'https://images.unsplash.com/photo-1576961453646-b4c376c7021b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3OTQzMTV8MHwxfHNlYXJjaHwxMXx8b2ZmaWNlc3xlbnwwfHx8fDE3NTU3MDkwMTB8MA&ixlib=rb-4.1.0&q=80&w=400',
  'https://images.unsplash.com/photo-1510074377623-8cf13fb86c08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3OTQzMTV8MHwxfHNlYXJjaHwxMnx8b2ZmaWNlc3xlbnwwfHx8fDE3NTU3MDkwMTB8MA&ixlib=rb-4.1.0&q=80&w=400',
  'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3OTQzMTV8MHwxfHNlYXJjaHwxM3x8b2ZmaWNlc3xlbnwwfHx8fDE3NTU3MDkwMTB8MA&ixlib=rb-4.1.0&q=80&w=400',
  'https://images.unsplash.com/photo-1576242112365-49e5d83e1b31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3OTQzMTV8MHwxfHNlYXJjaHwxNHx8b2ZmaWNlc3xlbnwwfHx8fDE3NTU3MDkwMTB8MA&ixlib=rb-4.1.0&q=80&w=400',
  'https://images.unsplash.com/photo-1542089363-bba089ffaa25?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3OTQzMTV8MHwxfHNlYXJjaHwxNXx8b2ZmaWNlc3xlbnwwfHx8fDE3NTU3MDkwMTB8MA&ixlib=rb-4.1.0&q=80&w=400',
  'https://images.unsplash.com/photo-1505409859467-3a796fd5798e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3OTQzMTV8MHwxfHNlYXJjaHwxNnx8b2ZmaWNlc3xlbnwwfHx8fDE3NTU3MDkwMTB8MA&ixlib=rb-4.1.0&q=80&w=400',
  'https://images.unsplash.com/photo-1606857521015-7f9fcf423740?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3OTQzMTV8MHwxfHNlYXJjaHwxN3x8b2ZmaWNlc3xlbnwwfHx8fDE3NTU3MDkwMTB8MA&ixlib=rb-4.1.0&q=80&w=400',
  'https://images.unsplash.com/photo-1557113166-6bf8102e535b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3OTQzMTV8MHwxfHNlYXJjaHwxOHx8b2ZmaWNlc3xlbnwwfHx8fDE3NTU3MDkwMTB8MA&ixlib=rb-4.1.0&q=80&w=400',
  'https://images.unsplash.com/photo-1462826303086-329426d1aef5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3OTQzMTV8MHwxfHNlYXJjaHwxOXx8b2ZmaWNlc3xlbnwwfHx8fDE3NTU3MDkwMTB8MA&ixlib=rb-4.1.0&q=80&w=400',
  'https://images.unsplash.com/photo-1438089966501-33bb60deddf6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3OTQzMTV8MHwxfHNlYXJjaHwyMHx8b2ZmaWNlc3xlbnwwfHx8fDE3NTU3MDkwMTB8MA&ixlib=rb-4.1.0&q=80&w=400',
  'https://images.unsplash.com/photo-1568992687947-868a62a9f521?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3OTQzMTV8MHwxfHNlYXJjaHwyMXx8b2ZmaWNlc3xlbnwwfHx8fDE3NTU3MDkwMTB8MA&ixlib=rb-4.1.0&q=80&w=400',
  'https://images.unsplash.com/photo-1594648144731-a3b350b89a94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3OTQzMTV8MHwxfHNlYXJjaHwyMnx8b2ZmaWNlc3xlbnwwfHx8fDE3NTU3MDkwMTB8MA&ixlib=rb-4.1.0&q=80&w=400',
  'https://images.unsplash.com/photo-1579487785973-74d2ca7abdd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3OTQzMTV8MHwxfHNlYXJjaHwyM3x8b2ZmaWNlc3xlbnwwfHx8fDE3NTU3MDkwMTB8MA&ixlib=rb-4.1.0&q=80&w=400',
  'https://images.unsplash.com/photo-1627293007119-3c892e2308c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3OTQzMTV8MHwxfHNlYXJjaHwyNHx8b2ZmaWNlc3xlbnwwfHx8fDE3NTU3MDkwMTB8MA&ixlib=rb-4.1.0&q=80&w=400',
  'https://images.unsplash.com/photo-1527928026657-38e53124b63f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3OTQzMTV8MHwxfHNlYXJjaHwyNXx8b2ZmaWNlc3xlbnwwfHx8fDE3NTU3MDkwMTB8MA&ixlib=rb-4.1.0&q=80&w=400',
  'https://images.unsplash.com/photo-1704655295887-d0b2547c2249?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3OTQzMTV8MHwxfHNlYXJjaHwyNnx8b2ZmaWNlc3xlbnwwfHx8fDE3NTU3MDkwMTB8MA&ixlib=rb-4.1.0&q=80&w=400',
  'https://images.unsplash.com/photo-1603294278610-b5bd0506303e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3OTQzMTV8MHwxfHNlYXJjaHwyN3x8b2ZmaWNlc3xlbnwwfHx8fDE3NTU3MDkwMTB8MA&ixlib=rb-4.1.0&q=80&w=400',
  'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3OTQzMTV8MHwxfHNlYXJjaHwyOHx8b2ZmaWNlc3xlbnwwfHx8fDE3NTU3MDkwMTB8MA&ixlib=rb-4.1.0&q=80&w=400',
  'https://images.unsplash.com/photo-1621831337128-35676ca30868?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3OTQzMTV8MHwxfHNlYXJjaHwyOXx8b2ZmaWNlc3xlbnwwfHx8fDE3NTU3MDkwMTB8MA&ixlib=rb-4.1.0&q=80&w=400',
  'https://images.unsplash.com/photo-1519748174344-16e5d53bda7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3OTQzMTV8MHwxfHNlYXJjaHwzMHx8b2ZmaWNlc3xlbnwwfHx8fDE3NTU3MDkwMTB8MA&ixlib=rb-4.1.0&q=80&w=400',
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

const createOfficeData = (arg: {
  arr?: number;
  isFake?: boolean;
  services: Service[];
  type?: $Enums.OfficeType;
  years?: number;
}): Prisma.OfficeCreateManyInput => {
  const title = faker.company.buzzPhrase();
  const arrondissement = arg.arr
    ? PARIS_ARRONDISSEMENTS.find(a => a.arr === arg.arr) || faker.helpers.arrayElement(PARIS_ARRONDISSEMENTS)
    : faker.helpers.arrayElement(PARIS_ARRONDISSEMENTS);
  const arr = arrondissement.arr;
  const { lat, lng } = getRandomLocationInArrondissement(arr);
  const price = faker.number.float({ max: 150000, min: 500, multipleOf: 100 });
  const type = arg.type ?? faker.helpers.enumValue($Enums.OfficeType);
  const posts = faker.number.int({ max: 500, min: 1 });
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
    price,
    slug: faker.helpers.slugify(`${title} ${faker.number.int({
      max: 100,
      min: 1,
    })}`).toLowerCase(),
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
  const officesData: Prisma.OfficeCreateManyInput[] = [];
  const photosData: Prisma.PhotoCreateManyInput[] = [];
  const serviceIds = arg.services.map(service => service.id);

  PARIS_ARRONDISSEMENTS.forEach((arrondissement) => {
    for (const type of Object.values($Enums.OfficeType)) {
      if (type === $Enums.OfficeType.INDEPENDENT_SPACE) continue;

      const officeCount = faker.number.int({ max: 20, min: 5 });

      for (let i = 0; i < officeCount; i++) {
        const officeData = createOfficeData({
          arr: arrondissement.arr,
          services: arg.services,
          type,
          years: arg.years,
        });

        officesData.push(officeData);

        const photoCount = faker.number.int({ max: 8, min: 3 });
        for (let j = 0; j < photoCount; j++) {
          const description = faker.helpers.arrayElement(PHOTO_DESCRIPTIONS);
          const imageUrl = faker.helpers.arrayElement(SEED_IMAGES);
          photosData.push({
            alt: description,
            createdAt: officeData.createdAt!,
            id: createStringIdentifier(),
            officeId: officeData.id!,
            url: imageUrl,
          });
        }
      }
    }
  });

  await arg.prisma.$transaction([
    arg.prisma.office.createMany({
      data: officesData,
      skipDuplicates: true,
    }),
    arg.prisma.photo.createMany({
      data: photosData,
      skipDuplicates: true,
    }),
  ]);

  const createdOffices = await arg.prisma.office.findMany({
    where: {
      id: { in: officesData.map(office => office.id!) },
    },
  });

  const officeServiceConnections: Array<{ officeId: string; serviceIds: string[] }> = [];
  for (const office of createdOffices) {
    const selectedServiceCount = faker.number.int({ max: Math.min(serviceIds.length, 5), min: 1 });
    const selectedServices = faker.helpers.arrayElements(serviceIds, selectedServiceCount);
    officeServiceConnections.push({
      officeId: office.id,
      serviceIds: selectedServices,
    });
  }

  await Promise.all(
    officeServiceConnections.map(({ officeId, serviceIds }) =>
      arg.prisma.office.update({
        data: {
          services: {
            connect: serviceIds.map(serviceId => ({ id: serviceId })),
          },
        },
        where: { id: officeId },
      }),
    ),
  );

  return createdOffices;
};
