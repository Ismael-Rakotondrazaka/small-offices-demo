import type { StorePostRequest } from '~~/shared';

import { RepositoryProvider } from '~~/server/services';

import { PostDTOMapper } from './postDTOMapper';

export const StorePostEventHandlerFn: EventHandlerFn<
  StorePostRequest
> = async ({ body, userSession }) => {
  const authUser = await userSession.require().then(session => session.user);

  if (body.imageId) {
    const isExist = await RepositoryProvider.mediaRepository.findOne({
      where: {
        authorId: authUser.id,
        id: body.imageId,
      },
    });

    if (!isExist) {
      throw new Error(
        'Image not found or you do not have permission to use it.',
      );
    }
  }

  const post = await RepositoryProvider.postRepository.addOne({
    data: {
      authorId: body.authorId,
      content: body.content,
      imageId: body.imageId,
    },
  });

  return {
    data: PostDTOMapper.toDTO(post),
  };
};
