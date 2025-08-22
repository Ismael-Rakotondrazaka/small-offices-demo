import { Exception } from '~~/server/core/exceptions/exception';
import { AuditLogService } from '~~/server/services/auditLog/auditLogService';
import { RepositoryProvider } from '~~/server/services/repositories/repositoryProvider';

import { LeadDTOMapper } from './leadDTOMapper';

export const DestroyLeadEventHandlerFn: EventHandlerFn<DestroyLeadRequest> = async ({ params, userSession }) => {
  const user = await userSession.require();
  const lead = await RepositoryProvider.leadRepository.findOne({
    where: {
      id: params.id,
    },
  });

  if (lead === null) {
    throw Exception.notFound({
      data: {},
    });
  }

  await RepositoryProvider.leadRepository.deleteOne({
    where: {
      id: params.id,
    },
  });

  await AuditLogService.logDelete({
    meta: {
      email: lead.email,
      name: lead.name,
      status: lead.status,
    },
    targetId: lead.id,
    targetTable: 'Lead',
    userSession: user,
  });

  return {
    data: LeadDTOMapper.toDTO(lead),
  };
};
