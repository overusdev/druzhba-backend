import { Injectable } from '@nestjs/common';
import { Doc } from './entities/doc.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, In, Repository } from 'typeorm';
import { CreateDocInput } from './dto/create-doc.input';
import { UpdateDocInput } from './dto/update-doc.input';

@Injectable()
export class DocsService {
  constructor(@InjectRepository(Doc) private docRepository: Repository<Doc>) {}

  create(createDocInput: CreateDocInput): Promise<Doc> {
    const newDoc = this.docRepository.create(createDocInput);

    return this.docRepository.save(newDoc);
  }

  async findAll(take: number): Promise<Doc[]> {
    const getQuery = {
      take,
      order: {
        id: 'DESC',
      },
    };
    return this.docRepository.find(getQuery as FindManyOptions); // SELECT * docs
  }

  async findOne(id): Promise<Doc> {
    return this.docRepository.findOneBy({ id: id });
  }

  async update(updateDocInput: UpdateDocInput): Promise<Doc> {
    await this.docRepository.update(
      { id: updateDocInput.id },
      { ...updateDocInput },
    );
    return await this.findOne(updateDocInput.id);
  }

  async remove(id: number): Promise<number | string> {
    await this.docRepository.delete({ id: id });
    const message = `Doc with id ${id} was removed`;
    return message;
  }

  async removeByIds(ids: number[]): Promise<number | string> {
    await this.docRepository.delete([...ids]);
    const message = `News with id ${ids} was removed`;
    return message;
  }
}
