import { Slugifier } from '~~/server/core/slugifier';
import { AuditLogService } from '~~/server/services/auditLog/auditLogService';
import { RepositoryProvider } from '~~/server/services/repositories/repositoryProvider';

import { OfficeDTOMapper } from './officeDTOMapper';

export const StoreOfficeEventHandlerFn: EventHandlerFn<StoreOfficeRequest> = async ({ body, userSession }) => {
  const user = await userSession.require();
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

  await AuditLogService.logCreate({
    meta: {
      price: office.price,
      slug: office.slug,
      title: office.title,
      type: office.type,
    },
    targetId: office.id,
    targetTable: 'Office',
    userSession: user,
  });

  return {
    data: OfficeDTOMapper.toDTO(office),
  };
};
