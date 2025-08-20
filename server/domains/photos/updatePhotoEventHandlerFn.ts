import { AuditLogService } from '~~/server/services/auditLog/auditLogService';
import { RepositoryProvider } from '~~/server/services/repositories/repositoryProvider';

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
    meta: {
      alt: updatedPhoto.alt,
      officeId: updatedPhoto.officeId,
      previousAlt: photo.alt,
      previousOfficeId: photo.officeId,
      previousUrl: photo.url,
      url: updatedPhoto.url,
    },
    targetId: updatedPhoto.id,
    targetTable: 'Photo',
    userSession: user,
  });

  return {
    data: PhotoDTOMapper.toDTO(updatedPhoto),
  };
};
