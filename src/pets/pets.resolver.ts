import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
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

  @Mutation((returns) => Pet)
  createPet(
    @Args('createPetInput') createPetInput: CreatePetInput,
  ): Promise<Pet> {
    return this.petsService.createPet(createPetInput);
  }
}
