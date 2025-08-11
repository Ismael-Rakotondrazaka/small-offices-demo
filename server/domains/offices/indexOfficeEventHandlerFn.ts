import type { Prisma } from '~~/generated/prisma/client';
import type { IndexOfficeRequest } from '~~/shared';

import { RequestInputHelper } from '~~/server/core';
import { PaginationDTOMapper } from '~~/server/domains/paginations/paginationDTOMapper';
import { RepositoryProvider } from '~~/server/services';

import { OfficeDTOMapper } from './officeDTOMapper';

export const IndexOfficeEventHandlerFn: EventHandlerFn<IndexOfficeRequest> = async ({ path, query }) => {
  const haveWhereQueries = RequestInputHelper.haveWhereQueries<IndexOfficeRequest>(query, []);
  const where: Prisma.OfficeWhereInput | undefined = { AND: haveWhereQueries ? [] : undefined };
  const totalCount = await RepositoryProvider.officeRepository.count({ where });
  const pagination = new Pagination({ page: query.page, pageSize: query.pageSize, path, totalCount });
  const offices = await RepositoryProvider.officeRepository.findMany({ orderBy: [{ createdAt: query['orderBy[createdAt]'] }], skip: pagination.offset, take: pagination.pageSize, where });

  return {
    data: OfficeDTOMapper.toDTOs(offices),
    pagination: PaginationDTOMapper.toDTO(pagination, offices.length),
  };
};
