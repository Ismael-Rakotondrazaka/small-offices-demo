import { RepositoryProvider } from '~~/server/services/repositories/repositoryProvider';
import { AuditLogService } from '~~/server/services/auditLog/auditLogService';

import { ServiceDTOMapper } from './serviceDTOMapper';

export const UpdateServiceEventHandlerFn: EventHandlerFn<UpdateServiceRequest> = async ({ body, params, userSession }) => {
  const user = await userSession.require();
  const service = await RepositoryProvider.serviceRepository.findOne({
    where: {
      id: params.id,
    },
  });

  if (service === null) {
    throw Exception.notFound({
      data: {},
    });
  }

  const updatedService = await RepositoryProvider.serviceRepository.updateOne({
    data: {
      icon: body.icon,
      name: body.name,
    },
    where: {
      id: params.id,
    },
  });

  await AuditLogService.logUpdate({
    userSession: user,
    targetTable: 'Service',
    targetId: updatedService.id,
    meta: {
      name: updatedService.name,
      icon: updatedService.icon,
      previousName: service.name,
      previousIcon: service.icon,
    },
  });

  return {
    data: ServiceDTOMapper.toDTO(updatedService),
  };
};
