import type {
  Prisma,
  PrismaClient,
  Service,
} from '~~/generated/prisma/client';

import { faker } from '@faker-js/faker';

import { createStringIdentifier } from './identifiers';

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
  { icon: 'phone', name: 'Téléphonie' },
  { icon: 'monitor', name: 'Écrans de présentation' },
  { icon: 'wifi', name: 'WiFi dédié' },
  { icon: 'users', name: 'Espace détente' },
  { icon: 'bike', name: 'Vélos de service' },
  { icon: 'shower', name: 'Douches' },
  { icon: 'locker', name: 'Casiers' },
  { icon: 'mail', name: 'Réception de courrier' },
  { icon: 'calendar', name: 'Gestion des réservations' },
  { icon: 'headphones', name: 'Salles de conférence' },
];

export const createServices = async (arg: {
  prisma: PrismaClient;
  years: number;
}): Promise<Service[]> => {
  const servicesData: Prisma.ServiceCreateInput[] = SERVICES_DATA.map(service => ({
    createdAt: faker.date.past({ years: arg.years }),
    icon: service.icon,
    id: createStringIdentifier(),
    name: service.name,
  }));

  return Promise.all(
    servicesData.map(serviceData =>
      arg.prisma.service.create({
        data: serviceData,
      }),
    ),
  );
};
