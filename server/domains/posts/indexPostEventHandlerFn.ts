import type { Prisma } from '~~/generated/prisma/client';
import type { IndexPostRequest } from '~~/shared';

import { RequestInputHelper } from '~~/server/core';
import { PaginationDTOMapper } from '~~/server/domains/paginations/paginationDTOMapper';
import { RepositoryProvider } from '~~/server/services';

import { PostDTOMapper } from './postDTOMapper';

export const IndexPostEventHandlerFn: EventHandlerFn<
  IndexPostRequest
> = async ({ path, query }) => {
  const haveWhereQueries
    = RequestInputHelper.haveWhereQueries<IndexPostRequest>(query, []);
  const where: Prisma.PostWhereInput | undefined = {
    AND: haveWhereQueries ? [] : undefined,
  };
  const totalCount = await RepositoryProvider.postRepository.count({ where });
  const pagination = new Pagination({
    page: query.page,
    pageSize: query.pageSize,
    path,
    totalCount,
  });
  const posts = await RepositoryProvider.postRepository.findMany({
    orderBy: [{ createdAt: query['orderBy[createdAt]'] }],
    skip: pagination.offset,
    take: pagination.pageSize,
    where,
  });

  return {
    data: PostDTOMapper.toDTOs(posts),
    pagination: PaginationDTOMapper.toDTO(pagination, posts.length),
  };
};
