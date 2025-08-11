import type { Prisma } from '~~/generated/prisma/client';
import type { IndexOfficeRequest } from '~~/shared';

import { RequestInputHelper } from '~~/server/core';
import { PaginationDTOMapper } from '~~/server/domains/paginations/paginationDTOMapper';
import { RepositoryProvider } from '~~/server/services';

import { OfficeDTOMapper } from './officeDTOMapper';

export const IndexOfficeEventHandlerFn: EventHandlerFn<IndexOfficeRequest> = async ({ path, query }) => {
  const haveWhereQueries = RequestInputHelper.haveWhereQueries<IndexOfficeRequest>(query, [
    'arr[equals]',
    'arr[in]',
    'posts[gte]',
    'posts[lte]',
    'price[gte]',
    'price[lte]',
    'type[equals]',
  ]);
  const where: Prisma.OfficeWhereInput = {
    AND: haveWhereQueries
      ? [
          query['arr[equals]'] ? { arr: query['arr[equals]'] } : {},
          query['arr[in]'] ? { arr: { in: query['arr[in]'] } } : {},
          query['posts[gte]'] ? { posts: { gte: query['posts[gte]'] } } : {},
          query['posts[lte]'] ? { posts: { lte: query['posts[lte]'] } } : {},
          query['price[gte]'] ? { price: { gte: query['price[gte]'] } } : {},
          query['price[lte]'] ? { price: { lte: query['price[lte]'] } } : {},
          query['type[equals]'] ? { type: query['type[equals]'] } : {},
        ]
      : undefined,
  };
  const totalCount = await RepositoryProvider.officeRepository.count({ where });
  const pagination = new Pagination({ page: query.page, pageSize: query.pageSize, path, totalCount });
  const offices = await RepositoryProvider.officeRepository.findMany({ orderBy: [{ price: query['orderBy[price]'] }], skip: pagination.offset, take: pagination.pageSize, where });

  return {
    data: OfficeDTOMapper.toDTOs(offices),
    pagination: PaginationDTOMapper.toDTO(pagination, offices.length),
  };
};
