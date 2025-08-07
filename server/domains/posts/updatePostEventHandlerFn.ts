import type { UpdatePostRequest } from '~~/shared';

import { RepositoryProvider } from '~~/server/services';

import { PostDTOMapper } from './postDTOMapper';

export const UpdatePostEventHandlerFn: EventHandlerFn<
  UpdatePostRequest
> = async ({ body, params }) => {
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

  const updatedPost = await RepositoryProvider.postRepository.updateOne({
    data: {
      authorId: body.authorId,
      content: body.content,
      imageId: body.imageId,
    },
    where: {
      id: params.id,
    },
  });

  return {
    data: PostDTOMapper.toDTO(updatedPost),
  };
};
