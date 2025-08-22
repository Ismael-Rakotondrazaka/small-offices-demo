import { Exception } from '~~/server/core/exceptions/exception';
import { AuditLogService } from '~~/server/services/auditLog/auditLogService';
import { RepositoryProvider } from '~~/server/services/repositories/repositoryProvider';

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
    meta: {
      price: office.price,
      slug: office.slug,
      title: office.title,
      type: office.type,
    },
    targetId: office.id,
    targetTable: 'Office',
    userSession: user,
  });

  return {
    data: OfficeDTOMapper.toDTO(office),
  };
};
