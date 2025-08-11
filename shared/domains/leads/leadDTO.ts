import { z } from 'zod';

export interface LeadDTO {
  createdAt: Date;
  email: string;
  id: string;
  name: string;
  officeId: string;
  phone: null | string;
  updatedAt: Date;
}

export const LeadDTOSchema: z.ZodType<LeadDTO> = z.object({ createdAt: z.coerce.date(), email: z.string(), id: z.string(), name: z.string(), officeId: z.string(), phone: z.string().nullable(), updatedAt: z.coerce.date() });
