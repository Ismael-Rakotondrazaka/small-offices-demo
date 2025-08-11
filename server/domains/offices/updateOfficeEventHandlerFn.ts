import type { UpdateOfficeRequest } from '~~/shared';

import { RepositoryProvider } from '~~/server/services';
import { Slugifier } from '~~/server/core/slugifier';

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

  let slug = body.slug;
  
  if (body.title && body.title !== office.title && !body.slug) {
    const baseSlug = Slugifier.slugify(body.title);
    slug = await Slugifier.generateUniqueSlug(
      baseSlug,
      (slugToCheck) => RepositoryProvider.officeRepository.slugExists(slugToCheck)
    );
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
      slug,
      title: body.title,
    },
    where: {
      id: params.id,
    },
  });

  return {
    data: OfficeDTOMapper.toDTO(updatedOffice),
  };
};
