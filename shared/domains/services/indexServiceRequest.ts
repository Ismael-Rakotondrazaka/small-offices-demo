import type { PaginationDTO } from '~~/shared/domains/paginations/paginationDTO';
import type { Request } from '~~/shared/requests/request';

import { serviceConfig } from '~~/shared/domains/services/serviceConfig';
import { makePaginatedSchema } from '~~/shared/schemas/paginationSchema';
import { SortOrderSchema } from '~~/shared/schemas/sortOrderSchema';
import { z } from 'zod';

import type { ServiceDTO } from './serviceDTO';

export type IndexServiceRequestData = { data: ServiceDTO[]; pagination: PaginationDTO };

export const IndexServiceRequestQuerySchema = z.object({ 'orderBy[createdAt]': SortOrderSchema, 'orderBy[id]': SortOrderSchema }).partial().merge(makePaginatedSchema({ defaultPageSize: serviceConfig.PAGE_SIZE_DEFAULT_VALUE })); ;

export type IndexServiceRequest = Request<IndexServiceRequestData, Record<string, never>, Record<string, never>, IndexServiceRequestQuery>;
export type IndexServiceRequestQuery = z.infer<typeof IndexServiceRequestQuerySchema>;
