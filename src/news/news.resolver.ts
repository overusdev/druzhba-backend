import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/auth.guard';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { NewsService } from './news.service';
import { News } from './entities/news.entity';
import { CreateNewsInput } from './dto/create-news.input';
import { UpdateNewsInput } from './dto/update-news.input';

@Resolver(() => News)
export class NewsResolver {
  constructor(private readonly newsService: NewsService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => News)
  createNews(@Args('createNewsInput') createNewsInput: CreateNewsInput) {
    return this.newsService.create(createNewsInput);
  }

  @Query((returns) => [News])
  news(@Args('take', { type: () => Int }) take: number): Promise<News[]> {
    return this.newsService.findAll(take);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Int)
  async newsCount() {
    return this.newsService.getNewsCount();
  }

  @Query(() => News, { name: 'new' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.newsService.findOne(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => News)
  async updateNews(
    @Args('updateNewsInput') updateNewsInput: UpdateNewsInput,
  ): Promise<News> {
    return await this.newsService.update(updateNewsInput);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => News)
  removeNews(@Args('id', { type: () => Int }) id: number) {
    return this.newsService.remove(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => News)
  async removeNewsByIds(@Args('ids', { type: () => [Int] }) ids: number[]) {
    return this.newsService.removeByIds(ids);
  }
}
