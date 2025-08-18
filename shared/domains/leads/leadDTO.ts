import { z } from 'zod';

import { type OfficeDTO, OfficeDTOSchema } from '../../../shared/domains/offices/officeDTO';
import { type LeadStatus, LeadStatusSchema } from './leadStatus';

export interface LeadDTO {
  createdAt: Date;
  email: string;
  id: string;
  name: string;
  office: OfficeDTO;
  phone: string;
  status: LeadStatus;
  updatedAt: Date;
}

export const LeadDTOSchema: z.ZodType<LeadDTO> = z.object({ createdAt: z.coerce.date(), email: z.string().email(), id: z.string(), name: z.string(), office: OfficeDTOSchema, phone: z.string(), status: LeadStatusSchema, updatedAt: z.coerce.date() });
