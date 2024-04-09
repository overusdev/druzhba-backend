import { Injectable } from '@nestjs/common';
import { Pet } from './pets.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, In, Repository } from 'typeorm';
import { CreatePetInput } from './dto/create-pet.input';
import { UpdatePetInput } from './dto/update-pet.input';

@Injectable()
export class PetsService {
  constructor(@InjectRepository(Pet) private petsRepository: Repository<Pet>) {}

  create(createPetInput: CreatePetInput): Promise<Pet> {
    const newPet = this.petsRepository.create(createPetInput); // newPet = new Pet()

    return this.petsRepository.save(newPet); // insert
  }

  // async findAll(): Promise<Pet[]> {
  //   return this.petsRepository.find(); // SELECT * pets
  // }
  async findAll(take: number): Promise<Pet[]> {
    const getQuery = {
      take,
      order: {
        id: 'DESC',
      },
    };
    return this.petsRepository.find(getQuery as FindManyOptions); // SELECT * pets
  }

  async findOne(id): Promise<Pet> {
    return this.petsRepository.findOneBy({ id: id }); // SELECT pets by id
  }

  async remove(id: number): Promise<number | string> {
    await this.petsRepository.delete({ id: id });
    const message = `Item with id ${id} was removed`;
    return message;
  }

  async removeByIds(ids: number[]): Promise<number | string> {
    await this.petsRepository.delete([...ids]);
    const message = `Item with id ${ids} was removed`;
    return message;
  }

  async update(updatePetInput: UpdatePetInput): Promise<Pet> {
    await this.petsRepository.update(
      { id: updatePetInput.id },
      { ...updatePetInput },
    );

    return await this.findOne(updatePetInput.id);
  }

  // deleteMany(input: UpdatePetInput[]): Promise<Pet[]> {
  //   return this.petsRepository.delete(input);
  // }

  // async deleteManyPets(where: UpdatePetInput): Promise<Pet> {
  //   try {
  //     return await this.petsRepository.delete({ where: id });
  //     // return await this.prisma.user.deleteMany({ where });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
}
