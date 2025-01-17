import { Injectable } from '@nestjs/common';
import { News } from './entities/news.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, In, Repository } from 'typeorm';
import { CreateNewsInput } from './dto/create-news.input';
import { UpdateNewsInput } from './dto/update-news.input';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News) private newsRepository: Repository<News>,
  ) {}

  create(createNewsInput: CreateNewsInput): Promise<News> {
    const newUser = this.newsRepository.create(createNewsInput);

    return this.newsRepository.save(newUser);
  }

  async findAll(take: number): Promise<News[]> {
    const getQuery = {
      take,
      order: {
        id: 'DESC',
      },
    };
    return this.newsRepository.find(getQuery as FindManyOptions); // SELECT * users
  }

  async getNewsCount() {
    return this.newsRepository.count();
  }

  async findOne(id): Promise<News> {
    return this.newsRepository.findOneBy({ id: id }); // SELECT user by id
  }

  async remove(id: number): Promise<number | string> {
    await this.newsRepository.delete({ id: id });
    const message = `News with id ${id} was removed`;
    return message;
  }

  async removeByIds(ids: number[]): Promise<number | string> {
    await this.newsRepository.delete([...ids]);
    const message = `News with id ${ids} was removed`;
    return message;
  }

  async update(updateNewsInput: UpdateNewsInput): Promise<News> {
    await this.newsRepository.update(
      { id: updateNewsInput.id },
      { ...updateNewsInput },
    );
    return await this.findOne(updateNewsInput.id);
  }
}
