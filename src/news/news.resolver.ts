import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { NewsService } from './news.service';
import { News } from './entities/news.entity';
import { CreateNewsInput } from './dto/create-news.input';
import { UpdateNewsInput } from './dto/update-news.input';

@Resolver(() => News)
export class NewsResolver {
  constructor(private readonly newsService: NewsService) {}

  @Mutation(() => News)
  createNews(@Args('createNewsInput') createNewsInput: CreateNewsInput) {
    return this.newsService.create(createNewsInput);
  }

  @Query((returns) => [News])
  news(@Args('take', { type: () => Int }) take: number): Promise<News[]> {
    return this.newsService.findAll(take);
  }

  @Query(() => News, { name: 'new' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.newsService.findOne(id);
  }

  @Mutation((returns) => News)
  async updateNews(
    @Args('updateNewsInput') updateNewsInput: UpdateNewsInput,
  ): Promise<News> {
    return await this.newsService.update(updateNewsInput);
  }

  @Mutation(() => News)
  removeNews(@Args('id', { type: () => Int }) id: number) {
    return this.newsService.remove(id);
  }

  @Mutation(() => News)
  async removeNewsByIds(@Args('ids', { type: () => [Int] }) ids: number[]) {
    return this.newsService.removeByIds(ids);
  }
}
