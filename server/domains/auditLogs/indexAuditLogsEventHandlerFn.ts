import type { Prisma } from '~~/generated/prisma/client';

import { RequestInputHelper } from '~~/server/core/requests/requestInputGetter';
import { PaginationDTOMapper } from '~~/server/domains/paginations/paginationDTOMapper';
import { RepositoryProvider } from '~~/server/services/repositories/repositoryProvider';

import { AuditLogDTOMapper } from './auditLogDTOMapper';

export const IndexAuditLogsEventHandlerFn: EventHandlerFn<IndexAuditLogsRequest> = async ({ path, query, userSession }) => {
  await userSession.require();

  const haveWhereQueries = RequestInputHelper.haveWhereQueries<IndexAuditLogsRequest>(query, [
    'action[equals]',
    'targetTable[equals]',
    'actorId[equals]',
    'createdAt[gte]',
    'createdAt[lte]',
  ]);

  const where: Prisma.AuditLogWhereInput = {
    AND: haveWhereQueries
      ? [
          query['action[equals]'] ? { action: query['action[equals]'] } : {},
          query['targetTable[equals]'] ? { targetTable: query['targetTable[equals]'] } : {},
          query['actorId[equals]'] ? { actorId: query['actorId[equals]'] } : {},
          query['createdAt[gte]'] ? { createdAt: { gte: query['createdAt[gte]'] } } : {},
          query['createdAt[lte]'] ? { createdAt: { lte: query['createdAt[lte]'] } } : {},
        ]
      : undefined,
  };

  const totalCount = await RepositoryProvider.auditLogRepository.count({ where });
  const pagination = new Pagination({ page: query.page, pageSize: query.pageSize, path, totalCount });
  const auditLogs = await RepositoryProvider.auditLogRepository.findMany({
    orderBy: [
      {
        createdAt: query['orderBy[createdAt]'] || 'desc',
      },
    ],
    skip: pagination.offset,
    take: pagination.pageSize,
    where,
  });

  return {
    data: AuditLogDTOMapper.toDTOList(auditLogs),
    pagination: PaginationDTOMapper.toDTO(pagination, auditLogs.length),
  };
};
