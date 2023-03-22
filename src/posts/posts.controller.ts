import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';

import { toPromise } from 'src/shared/utils';
import { PostsCreateDto } from './dto/PostsCreateDto';
import { PostsDto } from './dto/PostsDto';
import { PostsListDto } from './dto/PostsListsDto';
import { PostsService } from './posts.service';

@Controller('api/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async findAll(): Promise<PostsListDto> {
    const posts = await this.postsService.getAllPosts();
    return toPromise({ posts });
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PostsDto> {
    return await this.postsService.getOnePosts(id);
  }

  @Post()
  async create(@Body() todoCreateDto: PostsCreateDto): Promise<PostsDto> {
    return await this.postsService.createPost(todoCreateDto);
  }

  //   @Put(':id')
  //   async update(
  //     @Param('id') id: string,
  //     @Body() postsDto: PostsDto,
  //   ): Promise<PostsDto> {
  //     return await this.postsService.updatePost(postsDto);
  //   }

  //   @Delete(':id')
  //   async destory(@Param('id') id: string): Promise<PostsDto> {
  //     return await this.postsService.destoryPost(id);
  //   }
}
