import type { Prisma } from '~~/generated/prisma/client';

import { Pagination } from '~~/server/core/paginations/pagination';
import { RequestInputHelper } from '~~/server/core/requests/requestInputGetter';
import { PaginationDTOMapper } from '~~/server/domains/paginations/paginationDTOMapper';
import { RepositoryProvider } from '~~/server/services/repositories/repositoryProvider';

import { LeadDTOMapper } from './leadDTOMapper';

export const IndexLeadEventHandlerFn: EventHandlerFn<IndexLeadRequest> = async ({ path, query }) => {
  const haveWhereQueries = RequestInputHelper.haveWhereQueries<IndexLeadRequest>(query, [
    'createdAt[gte]',
    'createdAt[lte]',
    'price[gte]',
    'price[lte]',
    'status[equals]',
    'search',
  ]);
  const where: Prisma.LeadWhereInput = {
    AND: haveWhereQueries
      ? [
          query['createdAt[gte]'] ? { createdAt: { gte: query['createdAt[gte]'] } } : {},
          query['createdAt[lte]'] ? { createdAt: { lte: query['createdAt[lte]'] } } : {},
          query['price[gte]'] ? { office: { price: { gte: query['price[gte]'] } } } : {},
          query['price[lte]'] ? { office: { price: { lte: query['price[lte]'] } } } : {},
          query['status[equals]'] ? { status: query['status[equals]'] } : {},
          query['search']
            ? {
                OR: [
                  { name: { contains: query['search'], mode: 'insensitive' } },
                  { email: { contains: query['search'], mode: 'insensitive' } },
                  { phone: { contains: query['search'], mode: 'insensitive' } },
                ],
              }
            : {},
        ]
      : undefined,
  };

  const totalCount = await RepositoryProvider.leadRepository.count({ where });
  const pagination = new Pagination({ page: query.page, pageSize: query.pageSize, path, totalCount });
  const leads = await RepositoryProvider.leadRepository.findMany({ orderBy: [
    {
      createdAt: query['orderBy[createdAt]'],
    },
    query['orderBy[price]']
      ? {
          office: {
            price: query['orderBy[price]'],
          },
        }
      : {},
  ], skip: pagination.offset, take: pagination.pageSize, where });

  return {
    data: LeadDTOMapper.toDTOs(leads),
    pagination: PaginationDTOMapper.toDTO(pagination, leads.length),
  };
};
