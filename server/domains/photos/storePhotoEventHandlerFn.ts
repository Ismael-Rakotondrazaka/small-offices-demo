import { AuditLogService } from '~~/server/services/auditLog/auditLogService';
import { RepositoryProvider } from '~~/server/services/repositories/repositoryProvider';

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
    meta: {
      alt: photo.alt,
      officeId: photo.officeId,
      url: photo.url,
    },
    targetId: photo.id,
    targetTable: 'Photo',
    userSession: user,
  });

  return {
    data: PhotoDTOMapper.toDTO(photo),
  };
};
