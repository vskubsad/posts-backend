import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { toPromise } from 'src/shared/utils';
import { PostsCreateDto } from './dto/PostsCreateDto';
import { PostsDto } from './dto/PostsDto';
import { PostsListDto } from './dto/PostsListsDto';
import { PostsService } from './posts.service';

@Controller('api/posts')
export class PostsController {
  /** 1 */
  constructor(private readonly postsService: PostsService) {}
  @Get()
  /** 2 */
  async findAll(): Promise<PostsListDto> {
    /** 3 */
    const posts = await this.postsService.getAllPosts();

    /** 4 */ return toPromise({ posts });
  }

  /** 5 */
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PostsDto> {
    return await this.postsService.getOnePosts(id);
  }

  /** 6 */
  @Post()

  /** 7 */
  async create(@Body() todoCreateDto: PostsCreateDto): Promise<PostsDto> {
    return await this.postsService.createPost(todoCreateDto);
  }

  //   @Put(':id')

  /** 8 */
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
