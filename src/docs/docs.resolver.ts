import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/auth.guard';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DocsService } from './docs.service';
import { Doc } from './entities/doc.entity';
import { CreateDocInput } from './dto/create-doc.input';
import { UpdateDocInput } from './dto/update-doc.input';

@Resolver(() => Doc)
export class DocsResolver {
  constructor(private readonly docsService: DocsService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Doc)
  createDoc(@Args('createDocInput') createDocInput: CreateDocInput) {
    return this.docsService.create(createDocInput);
  }

  @Query((returns) => [Doc])
  docs(@Args('take', { type: () => Int }) take: number): Promise<Doc[]> {
    return this.docsService.findAll(take);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Int)
  async docsCount() {
    return this.docsService.getDocsCount();
  }

  @Query(() => Doc, { name: 'doc' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.docsService.findOne(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Doc)
  async updateDoc(
    @Args('updateDocInput') updateDocInput: UpdateDocInput,
  ): Promise<Doc> {
    return await this.docsService.update(updateDocInput);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Doc)
  removeDoc(@Args('id', { type: () => Int }) id: number) {
    return this.docsService.remove(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Doc)
  async removeDocsByIds(@Args('ids', { type: () => [Int] }) ids: number[]) {
    return this.docsService.removeByIds(ids);
  }
}
