import type { PaginationDTO } from '#shared/domains/paginations/paginationDTO';
import type { Request } from '#shared/requests/request';

import { photoConfig } from '#shared/domains/photos/photoConfig';
import { makePaginatedSchema } from '#shared/schemas/paginationSchema';
import { SortOrderSchema } from '#shared/schemas/sortOrderSchema';
import { z } from 'zod';

import type { PhotoDTO } from './photoDTO';

export type IndexPhotoRequestData = { data: PhotoDTO[]; pagination: PaginationDTO };

export const IndexPhotoRequestQuerySchema = z.object({ 'orderBy[createdAt]': SortOrderSchema, 'orderBy[id]': SortOrderSchema }).partial().merge(makePaginatedSchema({ defaultPageSize: photoConfig.PAGE_SIZE_DEFAULT_VALUE })); ;

export type IndexPhotoRequest = Request<IndexPhotoRequestData, Record<string, never>, Record<string, never>, IndexPhotoRequestQuery>;
export type IndexPhotoRequestQuery = z.infer<typeof IndexPhotoRequestQuerySchema>;
