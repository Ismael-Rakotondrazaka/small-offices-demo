import type { OfficeDTO } from '~~/shared/domains/offices/officeDTO';
import type { PaginationDTO } from '~~/shared/domains/paginations/paginationDTO';
import type { Request } from '~~/shared/requests/request';

import { officeConfig } from '~~/shared/domains/offices/officeConfig';
import { OfficeTypeSchema } from '~~/shared/domains/offices/officeType';
import { makePaginatedSchema } from '~~/shared/schemas/paginationSchema';
import { SortOrderSchema } from '~~/shared/schemas/sortOrderSchema';
import { z } from 'zod';

export type IndexOfficeRequestData = { data: OfficeDTO[]; pagination: PaginationDTO };

export const IndexOfficeRequestQuerySchema = z.object({
  'arr[equals]': z.coerce.number().min(1).max(20),
  'arr[in]': z.array(z.coerce.number().min(1).max(20)),
  'orderBy[price]': SortOrderSchema,
  'price[gte]': z.number(),
  'price[lte]': z.number(),
  'type[equals]': OfficeTypeSchema,
}).partial().merge(makePaginatedSchema({ defaultPageSize: officeConfig.PAGE_SIZE_DEFAULT_VALUE }));

export type IndexOfficeRequest = Request<IndexOfficeRequestData, Record<string, never>, Record<string, never>, IndexOfficeRequestQuery>;
export type IndexOfficeRequestQuery = z.infer<typeof IndexOfficeRequestQuerySchema>;
