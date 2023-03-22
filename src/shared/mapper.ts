import { PostsDto } from 'src/posts/dto/PostsDto';
import { PostsEntity } from 'src/posts/entity/PostsEntity';

export const toPostsDto = (data: PostsEntity): PostsDto => {
  const { id, title, subTitle, description } = data;

  const postsDto: PostsDto = { id, title, subTitle, description };
  return postsDto;
};
