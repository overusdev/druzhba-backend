import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/auth.guard';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AdsService } from './ads.service';
import { Ads } from './entities/ad.entity';
import { CreateAdInput } from './dto/create-ad.input';
import { UpdateAdInput } from './dto/update-ad.input';

@Resolver(() => Ads)
export class AdsResolver {
  constructor(private readonly adsService: AdsService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Ads)
  createAds(@Args('createAdInput') createAdInput: CreateAdInput) {
    return this.adsService.create(createAdInput);
  }

  @Query((returns) => [Ads])
  ads(@Args('take', { type: () => Int }) take: number): Promise<Ads[]> {
    return this.adsService.findAll(take);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Int)
  async adsCount() {
    return this.adsService.getAdsCount();
  }

  @Query(() => Ads, { name: 'ad' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.adsService.findOne(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => Ads)
  async updateAds(
    @Args('updateAdInput') updateAdInput: UpdateAdInput,
  ): Promise<Ads> {
    return await this.adsService.update(updateAdInput);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Ads)
  removeAds(@Args('id', { type: () => Int }) id: number) {
    return this.adsService.remove(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Ads)
  async removeAdByIds(@Args('ids', { type: () => [Int] }) ids: number[]) {
    return this.adsService.removeByIds(ids);
  }
}
