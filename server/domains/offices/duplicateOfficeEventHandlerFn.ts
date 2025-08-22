import { Exception } from '~~/server/core/exceptions/exception';
import { Slugifier } from '~~/server/core/slugifier';
import { RepositoryProvider } from '~~/server/services/repositories/repositoryProvider';

import { OfficeDTOMapper } from './officeDTOMapper';

export const DuplicateOfficeEventHandlerFn: EventHandlerFn<DuplicateOfficeRequest> = async ({ params, userSession }) => {
  await userSession.require();

  const originalOffice = await RepositoryProvider.officeRepository.findOne({
    where: {
      slug: params.slug,
    },
  });

  if (!originalOffice) {
    throw Exception.notFound({
      data: {
        slug: params.slug,
      },
      message: 'Bureau non trouvé',
    });
  }

  const uniqueSlug = await Slugifier.generateUniqueSlug(
    originalOffice.slug,
    slug => RepositoryProvider.officeRepository.slugExists(slug),
  );

  const duplicatedOffice = await RepositoryProvider.officeRepository.addOne({
    data: {
      arr: originalOffice.arr,
      createdAt: originalOffice.createdAt,
      deletedAt: originalOffice.deletedAt,
      isFake: originalOffice.isFake,
      lat: originalOffice.lat,
      lng: originalOffice.lng,
      photos: {
        create: originalOffice.photos.map(photo => ({
          alt: photo.alt,
          createdAt: photo.createdAt,
          url: photo.url,
        })),
      },
      posts: originalOffice.posts,
      price: originalOffice.price,
      services: {
        connect: originalOffice.services.map(service => ({ id: service.id })),
      },
      slug: uniqueSlug,
      title: originalOffice.title,
      type: originalOffice.type,
      updatedAt: originalOffice.updatedAt,
    },
  });

  return {
    data: OfficeDTOMapper.toDTO(duplicatedOffice),
  };
};
