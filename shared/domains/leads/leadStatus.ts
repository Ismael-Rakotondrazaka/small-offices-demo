import { z } from 'zod';

export const LeadStatus = { CONTACTED: 'CONTACTED', CONVERTED: 'CONVERTED', DELETED: 'DELETED', LOST: 'LOST', PENDING: 'PENDING' } as const;

export type LeadStatus = (typeof LeadStatus)[keyof typeof LeadStatus];

export const LeadStatusSchema = z.nativeEnum(LeadStatus);

export const LeadStatusLabel: Record<LeadStatus, string> = {
  [LeadStatus.CONTACTED]: 'Contacté',
  [LeadStatus.CONVERTED]: 'Converti',
  [LeadStatus.DELETED]: 'Supprimé',
  [LeadStatus.LOST]: 'Perdu',
  [LeadStatus.PENDING]: 'En attente',
};
