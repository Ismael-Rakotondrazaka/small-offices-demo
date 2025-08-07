import { z } from 'zod';

export interface FileLike {
  lastModified: number;
  name: string;
  size: number;
  type: string;
}

export const FileLikeSchema: z.ZodType<FileLike> = z
  .object({
    lastModified: z.number(),
    name: z.string(),
    size: z.number(),
    type: z.string(),
  })
  // ! we make it strict to avoid issues
  .strict();
