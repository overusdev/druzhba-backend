import { Injectable } from '@nestjs/common';
import { Pet } from './pets.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePetInput } from './dto/create-pet.input';

@Injectable()
export class PetsService {
  constructor(@InjectRepository(Pet) private petsRepository: Repository<Pet>) {}

  createPet(createPetInput: CreatePetInput): Promise<Pet> {
    const newPet = this.petsRepository.create(createPetInput); // newPet = new Pet()

    return this.petsRepository.save(newPet); // insert
  }

  async findAll(): Promise<Pet[]> {
    return this.petsRepository.find(); // SELECT * pets
  }

  async findOne(id): Promise<Pet> {
    // return this.petsRepository.findOneOrFail(id); // SELECT pets by id
    return this.petsRepository.findOneBy({ id: id }); // SELECT pets by id
  }

  async updatePetName(petId, newName) {
    // const allPets = this.petsRepository.find();
    const allPets = await this.findAll();
    const [pet] = allPets.filter((item) => item.id === petId);

    pet.name = newName;

    return pet;
  }
}
