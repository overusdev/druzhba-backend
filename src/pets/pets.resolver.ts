import { Args, Mutation, Query, Resolver, Int } from '@nestjs/graphql';
import { Pet } from './pets.entity';
import { PetsService } from './pets.service';
import { CreatePetInput } from './dto/create-pet.input';
import { UpdatePetInput } from './dto/update-pet.input';

@Resolver()
export class PetsResolver {
  constructor(private petsService: PetsService) {}

  @Query((returns) => [Pet])
  pets(): Promise<Pet[]> {
    return this.petsService.findAll();
  }

  @Query((returns) => Pet)
  getPet(@Args('id', { type: () => Int }) id: number): Promise<Pet> {
    return this.petsService.findOne(id);
  }

  @Mutation((returns) => Pet)
  async createPet(
    @Args('createPetInput') createPetInput: CreatePetInput,
  ): Promise<Pet> {
    return await this.petsService.create(createPetInput);
  }

  @Mutation((returns) => Pet)
  async updatePet(
    @Args('updatePet') updatePetInput: UpdatePetInput,
  ): Promise<Pet> {
    return await this.petsService.update(updatePetInput);
  }

  @Mutation((returns) => Pet)
  async removePet(@Args('id', { type: () => Int }) id: number) {
    return await this.petsService.remove(id);
  }
}
