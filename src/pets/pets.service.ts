import { Injectable } from '@nestjs/common';
import { Pet } from './pets.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePetInput } from './dto/create-pet.input';
import { UpdatePetInput } from './dto/update-pet.input';

@Injectable()
export class PetsService {
  constructor(@InjectRepository(Pet) private petsRepository: Repository<Pet>) {}

  create(createPetInput: CreatePetInput): Promise<Pet> {
    const newPet = this.petsRepository.create(createPetInput); // newPet = new Pet()

    return this.petsRepository.save(newPet); // insert
  }

  async findAll(): Promise<Pet[]> {
    return this.petsRepository.find(); // SELECT * pets
  }

  async findOne(id): Promise<Pet> {
    return this.petsRepository.findOneBy({ id: id }); // SELECT pets by id
  }

  async remove(id: number): Promise<number> {
    await this.petsRepository.delete({ id: id });
    return id;
  }

  async update(updatePetInput: UpdatePetInput): Promise<Pet> {
    await this.petsRepository.update(
      { id: updatePetInput.id },
      { ...updatePetInput },
    );

    return await this.findOne(updatePetInput.id);
  }
}
