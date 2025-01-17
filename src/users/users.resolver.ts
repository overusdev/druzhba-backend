import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/auth.guard';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @UseGuards(GqlAuthGuard)
  @Query((returns) => [User])
  users(@Args('take', { type: () => Int }) take: number): Promise<User[]> {
    return this.usersService.findAll(take);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Int)
  async usersCount() {
    return this.usersService.getUsersCount();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOne(id);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User, { name: 'userByPhone' })
  findByPhone(@Args('phone') phone: string) {
    return this.usersService.findOneByPhone(phone);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User, { name: 'userByPassword' })
  findByPassword(@Args('password') password: string) {
    return this.usersService.findOneByPassword(password);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => User)
  async updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<User> {
    return await this.usersService.update(updateUserInput);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.remove(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => [User])
  async removeManyUsers(
    @Args({ name: 'input', type: () => [UpdateUserInput] })
    input: UpdateUserInput[],
  ) {
    console.log('UpdatePetInput', input);
    for await (const key of input) {
      console.log(key.id);
      this.usersService.remove(key.id);
    }
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async removeUsers(@Args('ids', { type: () => [Int] }) ids: number[]) {
    return this.usersService.removeByIds(ids);
  }
}
