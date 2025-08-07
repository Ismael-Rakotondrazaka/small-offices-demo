import type { DestroyPostRequest } from '~~/shared';

import { RepositoryProvider } from '~~/server/services';

import { PostDTOMapper } from './postDTOMapper';

export const DestroyPostEventHandlerFn: EventHandlerFn<
  DestroyPostRequest
> = async ({ params }) => {
  const post = await RepositoryProvider.postRepository.findOne({
    where: {
      id: params.id,
    },
  });

  if (post === null) {
    throw Exception.notFound({
      data: {},
    });
  }

  await RepositoryProvider.postRepository.deleteOne({
    where: {
      id: params.id,
    },
  });

  return {
    data: PostDTOMapper.toDTO(post),
  };
};
