import { Slugifier } from '~~/server/core/slugifier';
import { PrismaProvider } from '~~/server/services/prisma/prismaProvider';

export const BulkStoreOfficeEventHandlerFn: EventHandlerFn<BulkStoreOfficeRequest> = async ({ body, userSession }) => {
  await userSession.require();

  const createdOffices = await PrismaProvider.instance.office.createMany({
    data: body.offices.map(office => ({
      arr: office.arr,
      isFake: office.isFake,
      lat: office.lat,
      lng: office.lng,
      posts: office.posts,
      price: office.price,
      slug: Slugifier.slugify(office.title),
      title: office.title,
      type: office.type,
    })),
  });

  return {
    count: createdOffices.count,
  };
};
