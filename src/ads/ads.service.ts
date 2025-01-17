import { Injectable } from '@nestjs/common';
import { Ads } from './entities/ad.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, In, Repository } from 'typeorm';
import { CreateAdInput } from './dto/create-ad.input';
import { UpdateAdInput } from './dto/update-ad.input';

@Injectable()
export class AdsService {
  constructor(@InjectRepository(Ads) private adsRepository: Repository<Ads>) {}

  create(createAdInput: CreateAdInput): Promise<Ads> {
    const newAds = this.adsRepository.create(createAdInput);

    return this.adsRepository.save(newAds);
  }

  async findAll(take: number): Promise<Ads[]> {
    const getQuery = {
      take,
      order: {
        id: 'DESC',
      },
    };
    return this.adsRepository.find(getQuery as FindManyOptions);
  }

  async getAdsCount() {
    return this.adsRepository.count();
  }

  async findOne(id): Promise<Ads> {
    return this.adsRepository.findOneBy({ id: id });
  }

  async remove(id: number): Promise<number | string> {
    await this.adsRepository.delete({ id: id });
    const message = `Ads with id ${id} was removed`;
    return message;
  }

  async removeByIds(ids: number[]): Promise<number | string> {
    await this.adsRepository.delete([...ids]);
    const message = `Ads with id ${ids} was removed`;
    return message;
  }

  async update(updateAdInput: UpdateAdInput): Promise<Ads> {
    await this.adsRepository.update(
      { id: updateAdInput.id },
      { ...updateAdInput },
    );
    return await this.findOne(updateAdInput.id);
  }
}
