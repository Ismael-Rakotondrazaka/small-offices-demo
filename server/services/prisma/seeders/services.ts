import type {
  Prisma,
  PrismaClient,
  Service,
} from '~~/generated/prisma/client';

import { faker } from '@faker-js/faker';

import { createStringIdentifier } from './identifiers';

const SERVICES_DATA = [
  { icon: 'mdi:wifi', name: 'WiFi' },
  { icon: 'mdi:printer', name: 'Imprimante' },
  { icon: 'mdi:account-group', name: 'Salle de réunion' },
  { icon: 'mdi:coffee', name: 'Café' },
  { icon: 'mdi:car', name: 'Parking' },
  { icon: 'mdi:shield', name: 'Sécurité 24/7' },
  { icon: 'mdi:account-check', name: 'Réception' },
  { icon: 'mdi:thermometer', name: 'Climatisation' },
  { icon: 'mdi:white-balance-sunny', name: 'Terrasse' },
  { icon: 'mdi:silverware-fork-knife', name: 'Cuisine' },
  { icon: 'mdi:phone', name: 'Téléphonie' },
  { icon: 'mdi:monitor', name: 'Écrans de présentation' },
  { icon: 'mdi:wifi-strength-4', name: 'WiFi dédié' },
  { icon: 'mdi:sofa', name: 'Espace détente' },
  { icon: 'mdi:bike', name: 'Vélos de service' },
  { icon: 'mdi:shower', name: 'Douches' },
  { icon: 'mdi:locker', name: 'Casiers' },
  { icon: 'mdi:email', name: 'Réception de courrier' },
  { icon: 'mdi:calendar', name: 'Gestion des réservations' },
  { icon: 'mdi:headphones', name: 'Salles de conférence' },
];

export const createServices = async (arg: {
  prisma: PrismaClient;
  years: number;
}): Promise<Service[]> => {
  const servicesData: Prisma.ServiceCreateInput[] = SERVICES_DATA.map(service => ({
    createdAt: faker.date.future({ years: arg.years }),
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
