import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AdsService } from './ads.service';
import { Ads } from './entities/ad.entity';
import { CreateAdInput } from './dto/create-ad.input';
import { UpdateAdInput } from './dto/update-ad.input';

@Resolver(() => Ads)
export class AdsResolver {
  constructor(private readonly adsService: AdsService) {}

  @Mutation(() => Ads)
  createAds(@Args('createAdInput') createAdInput: CreateAdInput) {
    return this.adsService.create(createAdInput);
  }

  @Query((returns) => [Ads])
  ads(@Args('take', { type: () => Int }) take: number): Promise<Ads[]> {
    return this.adsService.findAll(take);
  }

  @Query(() => Ads, { name: 'ad' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.adsService.findOne(id);
  }

  @Mutation((returns) => Ads)
  async updateAds(
    @Args('updateAdInput') updateAdInput: UpdateAdInput,
  ): Promise<Ads> {
    return await this.adsService.update(updateAdInput);
  }

  @Mutation(() => Ads)
  removeAds(@Args('id', { type: () => Int }) id: number) {
    return this.adsService.remove(id);
  }

  @Mutation(() => Ads)
  async removeAdByIds(@Args('ids', { type: () => [Int] }) ids: number[]) {
    return this.adsService.removeByIds(ids);
  }
}
