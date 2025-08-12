import type { PaginationDTO } from '#shared/domains/paginations/paginationDTO';
import type { Request } from '#shared/requests/request';

import { officeServiceConfig } from '#shared/domains/officeServices/officeServiceConfig';
import { makePaginatedSchema } from '#shared/schemas/paginationSchema';
import { SortOrderSchema } from '#shared/schemas/sortOrderSchema';
import { z } from 'zod';

import type { OfficeServiceDTO } from './officeServiceDTO';

export type IndexOfficeServiceRequestData = { data: OfficeServiceDTO[]; pagination: PaginationDTO };

export const IndexOfficeServiceRequestQuerySchema = z.object({ 'orderBy[createdAt]': SortOrderSchema, 'orderBy[id]': SortOrderSchema }).partial().merge(makePaginatedSchema({ defaultPageSize: officeServiceConfig.PAGE_SIZE_DEFAULT_VALUE })); ;

export type IndexOfficeServiceRequest = Request<IndexOfficeServiceRequestData, Record<string, never>, Record<string, never>, IndexOfficeServiceRequestQuery>;
export type IndexOfficeServiceRequestQuery = z.infer<typeof IndexOfficeServiceRequestQuerySchema>;
