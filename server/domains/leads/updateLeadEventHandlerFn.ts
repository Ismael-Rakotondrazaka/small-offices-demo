import { AuditLogService } from '~~/server/services/auditLog/auditLogService';
import { RepositoryProvider } from '~~/server/services/repositories/repositoryProvider';

import { LeadDTOMapper } from './leadDTOMapper';

export const UpdateLeadEventHandlerFn: EventHandlerFn<UpdateLeadRequest> = async ({ body, params, userSession }) => {
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

  const updatedLead = await RepositoryProvider.leadRepository.updateOne({
    data: {
      status: body.status,
    },
    where: {
      id: params.id,
    },
  });

  await AuditLogService.logUpdate({
    meta: {
      email: updatedLead.email,
      name: updatedLead.name,
      previousStatus: lead.status,
      status: updatedLead.status,
    },
    targetId: updatedLead.id,
    targetTable: 'Lead',
    userSession: user,
  });

  return {
    data: LeadDTOMapper.toDTO(updatedLead),
  };
};
