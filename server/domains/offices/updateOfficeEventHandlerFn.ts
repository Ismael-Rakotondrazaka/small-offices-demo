import { Exception } from '~~/server/core/exceptions/exception';
import { Slugifier } from '~~/server/core/slugifier';
import { AuditLogService } from '~~/server/services/auditLog/auditLogService';
import { RepositoryProvider } from '~~/server/services/repositories/repositoryProvider';

import { OfficeDTOMapper } from './officeDTOMapper';

export const UpdateOfficeEventHandlerFn: EventHandlerFn<UpdateOfficeRequest> = async ({ body, params, userSession }) => {
  const user = await userSession.require();
  const office = await RepositoryProvider.officeRepository.findOne({
    where: {
      slug: params.slug,
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
      slugToCheck => RepositoryProvider.officeRepository.slugExists(slugToCheck),
    );
  }

  // Services check

  const previousServiceIds = new Set<string>(office.services.map(e => e.id));
  const newServiceIds = body.serviceIds ? new Set<string>(body.serviceIds) : new Set<string>();

  const serviceIdsToConnect = new Set<string>();
  const serviceIdsToDisconnect = new Set<string>();

  if (body.serviceIds !== undefined) {
    for (const id of newServiceIds)
      if (!previousServiceIds.has(id))
        serviceIdsToConnect.add(id);

    for (const id of previousServiceIds)
      if (!newServiceIds.has(id))
        serviceIdsToDisconnect.add(id);

    if (serviceIdsToConnect.size > 0) {
      const areAllServicesExist = await RepositoryProvider.serviceRepository.existMany({
        expected: serviceIdsToConnect.size,
        where: {
          id: {
            in: Array.from(serviceIdsToConnect),
          },
        },
      });

      if (!areAllServicesExist) {
        throw Exception.badRequest({
          data: {
            serviceIds: 'Une ou plusieurs services sont introuvables.',
          },
          message: 'Une ou plusieurs services sont introuvables.',
        });
      }
    }
  }

  // Photos check
  const previousPhotoUrls = new Set<string>(office.photos.map(e => e.url));
  const newPhotoUrls: string[] = [];
  const photoIdsToDelete = new Set<string>();

  if (body.photoUrls !== undefined) {
    for (const url of body.photoUrls) {
      if (!previousPhotoUrls.has(url)) {
        newPhotoUrls.push(url);
      }
    }

    for (const photos of office.photos) {
      if (!body.photoUrls.includes(photos.url)) {
        photoIdsToDelete.add(photos.id);
      }
    }
  }

  const updatedOffice = await RepositoryProvider.officeRepository.updateOne({
    data: {
      arr: body.arr,
      isFake: body.isFake,
      lat: body.lat,
      lng: body.lng,
      photos: {
        create: newPhotoUrls.map(url => ({ url })),
        delete: Array.from(photoIdsToDelete).map(id => ({ id })),
      },
      posts: body.posts,
      price: body.price,
      services: {
        connect: Array.from(serviceIdsToConnect).map(id => ({ id })),
        disconnect: Array.from(serviceIdsToDisconnect).map(id => ({ id })),
      },
      slug,
      title: body.title,
      type: body.type,
    },
    where: {
      slug: params.slug,
    },
  });

  await AuditLogService.logUpdate({
    meta: {
      changes: {
        photosAdded: newPhotoUrls,
        photosRemoved: Array.from(photoIdsToDelete),
        servicesAdded: Array.from(serviceIdsToConnect),
        servicesRemoved: Array.from(serviceIdsToDisconnect),
      },
      price: updatedOffice.price,
      slug: updatedOffice.slug,
      title: updatedOffice.title,
      type: updatedOffice.type,
    },
    targetId: updatedOffice.id,
    targetTable: 'Office',
    userSession: user,
  });

  return {
    data: OfficeDTOMapper.toDTO(updatedOffice),
  };
};
