import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { posts } from 'src/mock/posts.mock';
import { toPostsDto } from 'src/shared/mapper';
import { toPromise } from 'src/shared/utils';
import { v4 as uuidv4 } from 'uuid';
import { PostsCreateDto } from './dto/PostsCreateDto';
import { PostsDto } from './dto/PostsDto';
import { PostsEntity } from './entity/PostsEntity';

@Injectable()
export class PostsService {
  posts: PostsEntity[] = posts;

  async getOnePosts(id: string): Promise<PostsDto> {
    const todo = this.posts.find((todo) => todo.id === id);

    if (!todo) {
      throw new HttpException(
        `Post item doesn't exist`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return toPromise(toPostsDto(todo));
  }

  getAllPosts() {
    return posts;
  }

  async createPost(postDto: PostsCreateDto): Promise<PostsDto> {
    const { title, subTitle, description } = postDto;

    const todo: PostsEntity = {
      id: uuidv4(),
      title,
      subTitle,
      description,
    };

    this.posts.push(todo);
    return toPromise(toPostsDto(todo));
  }
}
