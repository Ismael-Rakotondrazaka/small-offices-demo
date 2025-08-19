import { RepositoryProvider } from '~~/server/services/repositories/repositoryProvider';
import { AuditLogService } from '~~/server/services/auditLog/auditLogService';

import { ServiceDTOMapper } from './serviceDTOMapper';

export const DestroyServiceEventHandlerFn: EventHandlerFn<DestroyServiceRequest> = async ({ params, userSession }) => {
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

  await RepositoryProvider.serviceRepository.deleteOne({
    where: {
      id: params.id,
    },
  });

  await AuditLogService.logDelete({
    userSession: user,
    targetTable: 'Service',
    targetId: service.id,
    meta: {
      name: service.name,
      icon: service.icon,
    },
  });

  return {
    data: ServiceDTOMapper.toDTO(service),
  };
};
