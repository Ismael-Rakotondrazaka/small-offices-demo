import { AuditLogService } from '~~/server/services/auditLog/auditLogService';
import { RepositoryProvider } from '~~/server/services/repositories/repositoryProvider';

import { ServiceDTOMapper } from './serviceDTOMapper';

export const StoreServiceEventHandlerFn: EventHandlerFn<StoreServiceRequest> = async ({ body, userSession }) => {
  const user = await userSession.require();
  const service = await RepositoryProvider.serviceRepository.addOne({
    data: {
      icon: body.icon,
      name: body.name,
    },
  });

  await AuditLogService.logCreate({
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
