import { z } from 'zod';

import { type LeadStatus, LeadStatusSchema } from './leadStatus';

export interface LeadDTO {
  createdAt: Date;
  email: string;
  id: string;
  name: string;
  officeId: string;
  phone: null | string;
  status: LeadStatus;
  updatedAt: Date;
}

export const LeadDTOSchema: z.ZodType<LeadDTO> = z.object({ createdAt: z.coerce.date(), email: z.string().email(), id: z.string(), name: z.string(), officeId: z.string(), phone: z.string(), status: LeadStatusSchema, updatedAt: z.coerce.date() });
