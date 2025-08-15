import { RepositoryProvider } from '~~/server/services/repositories/repositoryProvider';

export const IsAvailableOfficeEventHandlerFn: EventHandlerFn<IsAvailableOfficeRequest> = async ({ query }) => {
  const { slug } = query;
  const slugExists = await RepositoryProvider.officeRepository.slugExists(slug);

  return {
    data: !slugExists,
  };
};
