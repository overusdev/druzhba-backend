import { Args, Mutation, Query, Resolver, Int } from '@nestjs/graphql';
import { Pet } from './pets.entity';
import { PetsService } from './pets.service';
import { CreatePetInput } from './dto/create-pet.input';

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
  createPet(
    @Args('createPetInput') createPetInput: CreatePetInput,
  ): Promise<Pet> {
    return this.petsService.createPet(createPetInput);
  }

  @Mutation((returns) => Pet)
  async updatePetName(@Args({ name: 'petId', type: () => Int }) petId: number) {
    return this.petsService.updatePetName(petId, 'Mom');
  }
}
