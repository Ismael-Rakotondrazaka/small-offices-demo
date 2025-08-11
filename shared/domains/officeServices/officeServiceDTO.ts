import { z } from 'zod';

export interface OfficeServiceDTO {
  createdAt: Date;
  id: string;
  officeId: string;
  serviceId: string;
}

export const OfficeServiceDTOSchema: z.ZodType<OfficeServiceDTO> = z.object({ createdAt: z.coerce.date(), id: z.string(), officeId: z.string(), serviceId: z.string() });
