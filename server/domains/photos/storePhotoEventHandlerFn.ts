import { RepositoryProvider } from '~~/server/services/repositories/repositoryProvider';
import { AuditLogService } from '~~/server/services/auditLog/auditLogService';

import { PhotoDTOMapper } from './photoDTOMapper';

export const StorePhotoEventHandlerFn: EventHandlerFn<StorePhotoRequest> = async ({ body, userSession }) => {
  const user = await userSession.require();
  const photo = await RepositoryProvider.photoRepository.addOne({
    data: {
      alt: body.alt,
      officeId: body.officeId,
      url: body.url,
    },
  });

  await AuditLogService.logCreate({
    userSession: user,
    targetTable: 'Photo',
    targetId: photo.id,
    meta: {
      url: photo.url,
      alt: photo.alt,
      officeId: photo.officeId,
    },
  });

  return {
    data: PhotoDTOMapper.toDTO(photo),
  };
};
