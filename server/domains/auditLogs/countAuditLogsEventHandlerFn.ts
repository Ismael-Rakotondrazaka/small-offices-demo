import type { Prisma } from '~~/generated/prisma/client';

import { RequestInputHelper } from '~~/server/core/requests/requestInputGetter';
import { RepositoryProvider } from '~~/server/services/repositories/repositoryProvider';

export const CountAuditLogsEventHandlerFn: EventHandlerFn<CountAuditLogsRequest> = async ({ query, userSession }) => {
  await userSession.require();

  const haveWhereQueries = RequestInputHelper.haveWhereQueries<CountAuditLogsRequest>(query, [
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

  const count = await RepositoryProvider.auditLogRepository.count({
    where,
  });

  return count;
};
