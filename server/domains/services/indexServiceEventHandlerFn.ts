import type { Prisma } from '~~/generated/prisma/client';

import { Pagination } from '~~/server/core/paginations';
import { RequestInputHelper } from '~~/server/core/requests/requestInputGetter';
import { PaginationDTOMapper } from '~~/server/domains/paginations/paginationDTOMapper';
import { RepositoryProvider } from '~~/server/services/repositories/repositoryProvider';

import { ServiceDTOMapper } from './serviceDTOMapper';

export const IndexServiceEventHandlerFn: EventHandlerFn<IndexServiceRequest> = async ({ path, query }) => {
  const haveWhereQueries = RequestInputHelper.haveWhereQueries<IndexServiceRequest>(query, []);
  const where: Prisma.ServiceWhereInput | undefined = { AND: haveWhereQueries ? [] : undefined };
  const totalCount = await RepositoryProvider.serviceRepository.count({ where });
  const pagination = new Pagination({ page: query.page, pageSize: query.pageSize, path, totalCount });
  const services = await RepositoryProvider.serviceRepository.findMany({ orderBy: [{ createdAt: query['orderBy[createdAt]'] }], skip: pagination.offset, take: pagination.pageSize, where });

  return {
    data: ServiceDTOMapper.toDTOs(services),
    pagination: PaginationDTOMapper.toDTO(pagination, services.length),
  };
};
