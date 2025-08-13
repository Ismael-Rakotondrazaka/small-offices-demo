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
      posts: body.posts,
      price: body.price,
      slug: uniqueSlug,
      title: body.title,
      type: body.type,
    },
  });

  return {
    data: OfficeDTOMapper.toDTO(office),
  };
};
