import { Exception } from '~~/server/core/exceptions/exception';
import { AuditLogService } from '~~/server/services/auditLog/auditLogService';
import { RepositoryProvider } from '~~/server/services/repositories/repositoryProvider';

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
    meta: {
      icon: service.icon,
      name: service.name,
    },
    targetId: service.id,
    targetTable: 'Service',
    userSession: user,
  });

  return {
    data: ServiceDTOMapper.toDTO(service),
  };
};
