import { z } from 'zod';

export const OfficeType = {
  INDEPENDENT_SPACE: 'INDEPENDENT_SPACE',
  OPEN_SPACE: 'OPEN_SPACE',
  PRIVATE_OFFICE: 'PRIVATE_OFFICE',
} as const;

export type OfficeType = (typeof OfficeType)[keyof typeof OfficeType];

export const OfficeTypeSchema = z.nativeEnum(OfficeType);

export const OfficeTypeLabel: Record<OfficeType, string> = {
  [OfficeType.INDEPENDENT_SPACE]: 'Espace Indépendant',
  [OfficeType.OPEN_SPACE]: 'Open Space',
  [OfficeType.PRIVATE_OFFICE]: 'Bureau Privé',
};

export const OfficeTypes = Object.values(OfficeType);
