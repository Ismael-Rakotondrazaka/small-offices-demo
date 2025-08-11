import type { Prisma } from '~~/generated/prisma/client';
import type { IndexLeadRequest } from '~~/shared';

import { RequestInputHelper } from '~~/server/core';
import { PaginationDTOMapper } from '~~/server/domains/paginations/paginationDTOMapper';
import { RepositoryProvider } from '~~/server/services';

import { LeadDTOMapper } from './leadDTOMapper';

export const IndexLeadEventHandlerFn: EventHandlerFn<IndexLeadRequest> = async ({ path, query }) => {
  const haveWhereQueries = RequestInputHelper.haveWhereQueries<IndexLeadRequest>(query, []);
  const where: Prisma.LeadWhereInput | undefined = { AND: haveWhereQueries ? [] : undefined };
  const totalCount = await RepositoryProvider.leadRepository.count({ where });
  const pagination = new Pagination({ page: query.page, pageSize: query.pageSize, path, totalCount });
  const leads = await RepositoryProvider.leadRepository.findMany({ orderBy: [{ createdAt: query['orderBy[createdAt]'] }], skip: pagination.offset, take: pagination.pageSize, where });

  return {
    data: LeadDTOMapper.toDTOs(leads),
    pagination: PaginationDTOMapper.toDTO(pagination, leads.length),
  };
};
