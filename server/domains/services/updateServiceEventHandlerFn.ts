import { Exception } from '~~/server/core/exceptions/exception';
import { AuditLogService } from '~~/server/services/auditLog/auditLogService';
import { RepositoryProvider } from '~~/server/services/repositories/repositoryProvider';

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
    meta: {
      icon: updatedService.icon,
      name: updatedService.name,
      previousIcon: service.icon,
      previousName: service.name,
    },
    targetId: updatedService.id,
    targetTable: 'Service',
    userSession: user,
  });

  return {
    data: ServiceDTOMapper.toDTO(updatedService),
  };
};
