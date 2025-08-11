import type { UpdateOfficeRequest } from '~~/shared';

import { RepositoryProvider } from '~~/server/services';

import { OfficeDTOMapper } from './officeDTOMapper';

export const UpdateOfficeEventHandlerFn: EventHandlerFn<UpdateOfficeRequest> = async ({ body, params }) => {
  const office = await RepositoryProvider.officeRepository.findOne({
    where: {
      id: params.id,
    },
  });

  if (office === null) {
    throw Exception.notFound({
      data: {},
    });
  }

  const updatedOffice = await RepositoryProvider.officeRepository.updateOne({
    data: {
      arr: body.arr,
      description: body.description,
      isFake: body.isFake,
      lat: body.lat,
      lng: body.lng,
      posts: body.posts,
      price: body.price,
      slug: body.slug,
    },
    where: {
      id: params.id,
    },
  });

  return {
    data: OfficeDTOMapper.toDTO(updatedOffice),
  };
};
