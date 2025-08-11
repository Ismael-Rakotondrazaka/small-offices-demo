import { z } from 'zod';

export interface ServiceDTO {
  createdAt: Date;
  icon: null | string;
  id: string;
  name: string;
}

export const ServiceDTOSchema: z.ZodType<ServiceDTO> = z.object({ createdAt: z.coerce.date(), icon: z.string().nullable(), id: z.string(), name: z.string() });
