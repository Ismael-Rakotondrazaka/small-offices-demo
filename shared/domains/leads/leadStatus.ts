import { z } from 'zod';

export const LeadStatus = { CONTACTED: 'CONTACTED', CONVERTED: 'CONVERTED', LOST: 'LOST', PENDING: 'PENDING' } as const;

export type LeadStatus = (typeof LeadStatus)[keyof typeof LeadStatus];

export const LeadStatusSchema = z.nativeEnum(LeadStatus);

export const LeadStatusLabel: Record<LeadStatus, string> = {
  [LeadStatus.CONTACTED]: 'Contacté',
  [LeadStatus.CONVERTED]: 'Converti',
  [LeadStatus.LOST]: 'Perdu',
  [LeadStatus.PENDING]: 'En attente',
};

export const LeadStatuses = Object.values(LeadStatus);
