import { faker } from '@faker-js/faker';

export const createStringIdentifier = (): string => faker.string.uuid();
