import type { ShowPostRequest } from '~~/shared';

import { RepositoryProvider } from '~~/server/services';

import { PostDTOMapper } from './postDTOMapper';

export const ShowPostEventHandlerFn: EventHandlerFn<ShowPostRequest> = async ({
  params,
}) => {
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

  return {
    data: PostDTOMapper.toDTO(post),
  };
};
