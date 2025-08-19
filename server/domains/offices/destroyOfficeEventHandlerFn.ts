import { RepositoryProvider } from '~~/server/services/repositories/repositoryProvider';
import { AuditLogService } from '~~/server/services/auditLog/auditLogService';

import { OfficeDTOMapper } from './officeDTOMapper';

export const DestroyOfficeEventHandlerFn: EventHandlerFn<DestroyOfficeRequest> = async ({ params, userSession }) => {
  const user = await userSession.require();
  const office = await RepositoryProvider.officeRepository.findOne({
    where: {
      slug: params.slug,
    },
  });

  if (office === null) {
    throw Exception.notFound({
      data: {},
    });
  }

  await RepositoryProvider.officeRepository.deleteOne({
    where: {
      slug: params.slug,
    },
  });

  await AuditLogService.logDelete({
    userSession: user,
    targetTable: 'Office',
    targetId: office.id,
    meta: {
      title: office.title,
      slug: office.slug,
      price: office.price,
      type: office.type,
    },
  });

  return {
    data: OfficeDTOMapper.toDTO(office),
  };
};
