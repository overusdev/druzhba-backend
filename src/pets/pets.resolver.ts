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

  @Mutation(() => [Pet])
  async removeManyPets(
    @Args({ name: 'input', type: () => [UpdatePetInput] })
    input: UpdatePetInput[],
  ) {
    console.log('UpdatePetInput', input);
    for await (const key of input) {
      console.log(key.id);
      this.petsService.remove(key.id);
    }
  }

  @Mutation(() => Pet)
  async removePets(@Args('id', { type: () => [Number] }) id: string[]) {
    console.log(id);
    for await (const key of id) {
      console.log(key);
      // this.petsService.remove(key);
    }
    return true;
  }

  // @Mutation((returns) => Pet)
  // async removePets(
  //   @Args('deletePets') updatePetInput: UpdatePetInput,
  // ): Promise<Pet> {
  //   return await this.petsService.deleteMultiple(updatePetInput);
  // }

  // @Mutation(() => Pet)
  // async removePets(@Args('where') where: UpdatePetInput) {
  //   return await this.petsService.deleteManyPets(where);
  // }
}
