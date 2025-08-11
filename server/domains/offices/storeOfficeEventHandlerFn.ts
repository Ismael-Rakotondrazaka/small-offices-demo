import type { StoreOfficeRequest } from '~~/shared';

import { RepositoryProvider } from '~~/server/services';

import { OfficeDTOMapper } from './officeDTOMapper';

export const StoreOfficeEventHandlerFn: EventHandlerFn<StoreOfficeRequest> = async ({ body }) => {
  const office = await RepositoryProvider.officeRepository.addOne({
    data: {
      arr: body.arr,
      description: body.description,
      isFake: body.isFake,
      lat: body.lat,
      lng: body.lng,
      posts: body.posts,
      price: body.price,
      slug: body.slug,
      type: body.type,
    },
  });

  return {
    data: OfficeDTOMapper.toDTO(office),
  };
};
