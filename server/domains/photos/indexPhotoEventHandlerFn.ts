import type { Prisma } from '~~/generated/prisma/client';

import { RequestInputHelper } from '~~/server/core';
import { PaginationDTOMapper } from '~~/server/domains/paginations/paginationDTOMapper';
import { RepositoryProvider } from '~~/server/services/repositories/repositoryProvider';

import { PhotoDTOMapper } from './photoDTOMapper';

export const IndexPhotoEventHandlerFn: EventHandlerFn<IndexPhotoRequest> = async ({ path, query }) => {
  const haveWhereQueries = RequestInputHelper.haveWhereQueries<IndexPhotoRequest>(query, []);
  const where: Prisma.PhotoWhereInput | undefined = { AND: haveWhereQueries ? [] : undefined };
  const totalCount = await RepositoryProvider.photoRepository.count({ where });
  const pagination = new Pagination({ page: query.page, pageSize: query.pageSize, path, totalCount });
  const photos = await RepositoryProvider.photoRepository.findMany({ orderBy: [{ createdAt: query['orderBy[createdAt]'] }], skip: pagination.offset, take: pagination.pageSize, where });

  return {
    data: PhotoDTOMapper.toDTOs(photos),
    pagination: PaginationDTOMapper.toDTO(pagination, photos.length),
  };
};
