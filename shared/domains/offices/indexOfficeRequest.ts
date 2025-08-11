import type { OfficeDTO } from '~~/shared/domains/offices/officeDTO';
import type { PaginationDTO } from '~~/shared/domains/paginations/paginationDTO';
import type { Request } from '~~/shared/requests/request';

import { officeConfig } from '~~/shared/domains/offices/officeConfig';
import { makePaginatedSchema } from '~~/shared/schemas/paginationSchema';
import { SortOrderSchema } from '~~/shared/schemas/sortOrderSchema';
import { z } from 'zod';

export type IndexOfficeRequestData = { data: OfficeDTO[]; pagination: PaginationDTO };

export const IndexOfficeRequestQuerySchema = z.object({ 'orderBy[createdAt]': SortOrderSchema, 'orderBy[id]': SortOrderSchema }).partial().merge(makePaginatedSchema({ defaultPageSize: officeConfig.PAGE_SIZE_DEFAULT_VALUE })); ;

export type IndexOfficeRequest = Request<IndexOfficeRequestData, Record<string, never>, Record<string, never>, IndexOfficeRequestQuery>;
export type IndexOfficeRequestQuery = z.infer<typeof IndexOfficeRequestQuerySchema>;
