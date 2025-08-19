import { RepositoryProvider } from '~~/server/services/repositories/repositoryProvider';
import { AuditLogService } from '~~/server/services/auditLog/auditLogService';

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
    userSession: user,
    targetTable: 'Lead',
    targetId: lead.id,
    meta: {
      name: lead.name,
      email: lead.email,
      status: lead.status,
    },
  });

  return {
    data: LeadDTOMapper.toDTO(lead),
  };
};
