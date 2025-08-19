import { RepositoryProvider } from '~~/server/services/repositories/repositoryProvider';
import { AuditLogService } from '~~/server/services/auditLog/auditLogService';

import { PhotoDTOMapper } from './photoDTOMapper';

export const UpdatePhotoEventHandlerFn: EventHandlerFn<UpdatePhotoRequest> = async ({ body, params, userSession }) => {
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

  const updatedPhoto = await RepositoryProvider.photoRepository.updateOne({
    data: {
      alt: body.alt,
      officeId: body.officeId,
      url: body.url,
    },
    where: {
      id: params.id,
    },
  });

  await AuditLogService.logUpdate({
    userSession: user,
    targetTable: 'Photo',
    targetId: updatedPhoto.id,
    meta: {
      url: updatedPhoto.url,
      alt: updatedPhoto.alt,
      officeId: updatedPhoto.officeId,
      previousUrl: photo.url,
      previousAlt: photo.alt,
      previousOfficeId: photo.officeId,
    },
  });

  return {
    data: PhotoDTOMapper.toDTO(updatedPhoto),
  };
};
