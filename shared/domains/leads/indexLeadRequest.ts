import type { PaginationDTO } from '~~/shared/domains/paginations/paginationDTO';
import type { Request } from '~~/shared/requests/request';

import { leadConfig } from '~~/shared/domains/leads/leadConfig';
import { makePaginatedSchema } from '~~/shared/schemas/paginationSchema';
import { SortOrderSchema } from '~~/shared/schemas/sortOrderSchema';
import { z } from 'zod';

import type { LeadDTO } from './leadDTO';

import { LeadStatusSchema } from './leadStatus';

export type IndexLeadRequestData = { data: LeadDTO[]; pagination: PaginationDTO };

export const IndexLeadRequestQuerySchema = z.object({
  'orderBy[createdAt]': SortOrderSchema,
  'orderBy[price]': SortOrderSchema,
  'price[gte]': z.coerce.number().optional(),
  'price[lte]': z.coerce.number().optional(),
  'search': z.string().optional(),
  'status[equals]': LeadStatusSchema,
}).partial().merge(makePaginatedSchema({ defaultPageSize: leadConfig.PAGE_SIZE_DEFAULT_VALUE })); ;

export type IndexLeadRequest = Request<IndexLeadRequestData, Record<string, never>, Record<string, never>, IndexLeadRequestQuery>;
export type IndexLeadRequestQuery = z.infer<typeof IndexLeadRequestQuerySchema>;
