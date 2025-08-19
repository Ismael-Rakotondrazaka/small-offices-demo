import type { Prisma } from '~~/generated/prisma/client';

import { RequestInputHelper } from '~~/server/core/requests/requestInputGetter';
import { RepositoryProvider } from '~~/server/services/repositories/repositoryProvider';

import { AuditLogDTOMapper } from './auditLogDTOMapper';

export const IndexAuditLogsEventHandlerFn: EventHandlerFn<IndexAuditLogsRequest> = async ({ query, userSession }) => {
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

  const auditLogs = await RepositoryProvider.auditLogRepository.findMany({
    orderBy: [
      {
        createdAt: query['orderBy[createdAt]'] || 'desc',
      },
    ],
    skip: query.skip,
    take: query.take,
    where,
  });

  return {
    data: AuditLogDTOMapper.toDTOList(auditLogs),
  };
}; 