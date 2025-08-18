import type { Prisma } from '~~/generated/prisma/client';

import { RequestInputHelper } from '~~/server/core/requests/requestInputGetter';
import { RepositoryProvider } from '~~/server/services/repositories/repositoryProvider';
import { stringify } from 'csv-stringify/sync';

export const DownloadLeadsEventHandlerFn: EventHandlerFn<DownloadLeadsRequest> = async ({ query, setHeaders, userSession }) => {
  await userSession.require();

  const haveWhereQueries = RequestInputHelper.haveWhereQueries<DownloadLeadsRequest>(query, [
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

  const leads = await RepositoryProvider.leadRepository.findMany({
    orderBy: [
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
    ],
    where,
  });

  const csvData: string[][] = leads.map(lead => [
    lead.id,
    lead.name,
    lead.email,
    lead.phone,
    lead.status,
    lead.office.title,
    lead.office.slug,
    lead.office.price.toString(),
    lead.office.type,
    lead.office.arr.toString(),
    lead.office.lat.toString(),
    lead.office.lng.toString(),
    lead.createdAt.toISOString(),
  ]);

  const csv = stringify(csvData, {
    header: false,
  });

  const timestamp = new Date().toISOString().split('T')[0];
  const filename = `leads-${timestamp}.csv`;

  setHeaders({
    'Content-Disposition': `attachment; filename="${filename}"`,
    'Content-Type': 'text/csv',
  });

  return csv;
};
