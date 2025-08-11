import { z } from 'zod';

export interface PhotoDTO {
  alt: null | string;
  createdAt: Date;
  id: string;
  officeId: string;
  url: string;
}

export const PhotoDTOSchema: z.ZodType<PhotoDTO> = z.object({ alt: z.string().nullable(), createdAt: z.coerce.date(), id: z.string(), officeId: z.string(), url: z.string() });
