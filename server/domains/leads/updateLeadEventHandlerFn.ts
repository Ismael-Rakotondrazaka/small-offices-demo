import { RepositoryProvider } from '~~/server/services/repositories/repositoryProvider';
import { AuditLogService } from '~~/server/services/auditLog/auditLogService';

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
    userSession: user,
    targetTable: 'Lead',
    targetId: updatedLead.id,
    meta: {
      name: updatedLead.name,
      email: updatedLead.email,
      status: updatedLead.status,
      previousStatus: lead.status,
    },
  });

  return {
    data: LeadDTOMapper.toDTO(updatedLead),
  };
};
