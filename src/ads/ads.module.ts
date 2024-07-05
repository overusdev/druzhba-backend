import { Module } from '@nestjs/common';
import { AdsService } from './ads.service';
import { AdsResolver } from './ads.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ads } from './entities/ad.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ads])],
  providers: [AdsService, AdsResolver],
})
export class AdsModule {}
