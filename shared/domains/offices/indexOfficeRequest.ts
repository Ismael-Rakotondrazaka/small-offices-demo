import { z } from 'zod';

import type { OfficeDTO } from '../../../shared/domains/offices/officeDTO';
import type { PaginationDTO } from '../../../shared/domains/paginations/paginationDTO';
import type { Request } from '../../../shared/requests/request';

import { officeConfig } from '../../../shared/domains/offices/officeConfig';
import { OfficeTypeSchema } from '../../../shared/domains/offices/officeType';
import { makePaginatedSchema } from '../../../shared/schemas/paginationSchema';
import { SortOrderSchema } from '../../../shared/schemas/sortOrderSchema';

export type IndexOfficeRequestData = { data: OfficeDTO[]; pagination: PaginationDTO };

export const IndexOfficeRequestQuerySchema = z.object({
  'arr[equals]': z.coerce.number().max(20),
  'arr[in]': z.array(z.coerce.number().max(20)),
  'orderBy[createdAt]': SortOrderSchema,
  'orderBy[price]': SortOrderSchema,
  'posts[gte]': z.coerce.number().min(0),
  'posts[lte]': z.coerce.number().min(0),
  'price[gte]': z.coerce.number().min(0),
  'price[lte]': z.coerce.number().min(0),
  'search': z.string(),
  'type[equals]': OfficeTypeSchema,
}).partial().merge(makePaginatedSchema({ defaultPageSize: officeConfig.PAGE_SIZE_DEFAULT_VALUE }));

export type IndexOfficeRequest = Request<IndexOfficeRequestData, Record<string, never>, Record<string, never>, IndexOfficeRequestQuery>;
export type IndexOfficeRequestQuery = z.infer<typeof IndexOfficeRequestQuerySchema>;
