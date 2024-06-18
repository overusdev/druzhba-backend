import { Args, Mutation, Query, Resolver, Int } from '@nestjs/graphql';
import { Pet } from './pets.entity';
import { PetsService } from './pets.service';
import { CreatePetInput } from './dto/create-pet.input';
import { UpdatePetInput } from './dto/update-pet.input';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums/http-status.enum';

@Resolver()
export class PetsResolver {
  constructor(private petsService: PetsService) {}

  @Query((returns) => [Pet])
  // pets(): Promise<Pet[]> {
  pets(@Args('take', { type: () => Int }) take: number): Promise<Pet[]> {
    return this.petsService.findAll(take);
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

  // @Mutation((returns) => Pet)
  // async removePet(@Args('id', { type: () => Int }) id: number) {
  //   await this.petsService.remove(id);
  //   return 'await this.petsService.remove(id)';
  // }
  @Mutation(() => Pet)
  async removePet(@Args('id', { type: () => Int }) id: number) {
    try {
      await this.petsService.remove(id);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'This is a custom message',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    } finally {
      return 'await this.petsService.remove(id)';
    }
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
  async removePets(@Args('ids', { type: () => [Int] }) ids: number[]) {
    return this.petsService.removeByIds(ids);
  }
}
