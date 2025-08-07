import type { PostDTO } from '~~/shared';

import { UserDTOMapper } from '~~/server/domains/users/userDTOMapper';

import type { PostModel } from './postModel';

import { MediaDTOMapper } from '../media';

export abstract class PostDTOMapper {
  static toDTO(post: PostModel): PostDTO {
    return {
      author: UserDTOMapper.toDTO(post.author),
      content: post.content,
      createdAt: post.createdAt,
      deletedAt: post.deletedAt,
      id: post.id,
      image: post.image ? MediaDTOMapper.toDTO(post.image, true) : null,
      updatedAt: post.updatedAt,
    };
  }

  static toDTOs(posts: PostModel[]) {
    return posts.map(PostDTOMapper.toDTO);
  }
}
