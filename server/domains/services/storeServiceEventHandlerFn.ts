import { RepositoryProvider } from '~~/server/services/repositories/repositoryProvider';
import { AuditLogService } from '~~/server/services/auditLog/auditLogService';

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
