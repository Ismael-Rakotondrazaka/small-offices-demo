import type { Prisma } from '~~/generated/prisma/client';
import type { CountOfficesRequest } from '~~/shared/domains/offices/countOfficesRequest';

import { RequestInputHelper } from '~~/server/core/requests/requestInputGetter';
import { RepositoryProvider } from '~~/server/services/repositories/repositoryProvider';

export const CountOfficesEventHandlerFn: EventHandlerFn<CountOfficesRequest> = async ({ query }) => {
  const haveWhereQueries = RequestInputHelper.haveWhereQueries(query, [
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
  const count = await RepositoryProvider.officeRepository.count({ where });
  return count;
};
