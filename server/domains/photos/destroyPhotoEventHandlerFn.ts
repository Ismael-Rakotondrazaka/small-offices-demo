import { RepositoryProvider } from '~~/server/services/repositories/repositoryProvider';
import { AuditLogService } from '~~/server/services/auditLog/auditLogService';

import { PhotoDTOMapper } from './photoDTOMapper';

export const DestroyPhotoEventHandlerFn: EventHandlerFn<DestroyPhotoRequest> = async ({ params, userSession }) => {
  const user = await userSession.require();
  const photo = await RepositoryProvider.photoRepository.findOne({
    where: {
      id: params.id,
    },
  });

  if (photo === null) {
    throw Exception.notFound({
      data: {},
    });
  }

  await RepositoryProvider.photoRepository.deleteOne({
    where: {
      id: params.id,
    },
  });

  await AuditLogService.logDelete({
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
