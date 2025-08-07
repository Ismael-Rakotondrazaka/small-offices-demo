import { z } from 'zod';

export interface PaginationDTO {
  count: number;
  links: PaginationDTOLinks;
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

export interface PaginationDTOLinks {
  current: string;
  first: string;
  last: string;
  next: null | string;
  previous: null | string;
}

export const PaginationDTOSchema: z.ZodType<PaginationDTO> = z.object({
  count: z.number(),
  links: z.object({
    current: z.string(),
    first: z.string(),
    last: z.string(),
    next: z.string().nullable(),
    previous: z.string().nullable(),
  }),
  page: z.number(),
  pageSize: z.number(),
  totalCount: z.number(),
  totalPages: z.number(),
});
