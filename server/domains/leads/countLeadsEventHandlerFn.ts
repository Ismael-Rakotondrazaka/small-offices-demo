import type { Prisma } from '~~/generated/prisma/client';
import type { CountLeadsRequest } from '~~/shared/domains/leads/countLeadsRequest';

import { RequestInputHelper } from '~~/server/core/requests/requestInputGetter';
import { RepositoryProvider } from '~~/server/services/repositories/repositoryProvider';

export const CountLeadsEventHandlerFn: EventHandlerFn<CountLeadsRequest> = async ({ query }) => {
  const haveWhereQueries = RequestInputHelper.haveWhereQueries(query, [
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

  const count = await RepositoryProvider.leadRepository.count({ where });
  return count;
};
