import type { Prisma } from '~~/generated/prisma/client';

import { RequestInputHelper } from '~~/server/core';
import { PaginationDTOMapper } from '~~/server/domains/paginations/paginationDTOMapper';
import { RepositoryProvider } from '~~/server/services/repositories/repositoryProvider';

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
    'search',
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
          query['search']
            ? {
                OR: [
                  { title: { contains: query['search'], mode: 'insensitive' } },
                  { slug: { contains: query['search'], mode: 'insensitive' } },
                ],
              }
            : {},
        ]
      : undefined,
  };
  const totalCount = await RepositoryProvider.officeRepository.count({ where });
  const pagination = new Pagination({ page: query.page, pageSize: query.pageSize, path, totalCount });
  const offices = await RepositoryProvider.officeRepository.findMany({ orderBy: [{ price: query['orderBy[price]'] }, { createdAt: query['orderBy[createdAt]'] }], skip: pagination.offset, take: pagination.pageSize, where });

  return {
    data: OfficeDTOMapper.toDTOs(offices),
    pagination: PaginationDTOMapper.toDTO(pagination, offices.length),
  };
};
