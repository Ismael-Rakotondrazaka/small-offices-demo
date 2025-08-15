import { Slugifier } from '~~/server/core/slugifier';
import { RepositoryProvider } from '~~/server/services/repositories/repositoryProvider';

import { OfficeDTOMapper } from './officeDTOMapper';

export const StoreOfficeEventHandlerFn: EventHandlerFn<StoreOfficeRequest> = async ({ body }) => {
  const baseSlug = body.slug || Slugifier.slugify(body.title);

  const uniqueSlug = await Slugifier.generateUniqueSlug(
    baseSlug,
    slug => RepositoryProvider.officeRepository.slugExists(slug),
  );

  const office = await RepositoryProvider.officeRepository.addOne({
    data: {
      arr: body.arr,
      isFake: body.isFake,
      lat: body.lat,
      lng: body.lng,
      photos: {
        create: [...new Set(body.photoUrls)].map(url => ({ url })),
      },
      posts: body.posts,
      price: body.price,
      services: {
        connect: [...new Set(body.serviceIds)].map(id => ({ id })),
      },
      slug: uniqueSlug,
      title: body.title,
      type: body.type,
    },
  });

  return {
    data: OfficeDTOMapper.toDTO(office),
  };
};
