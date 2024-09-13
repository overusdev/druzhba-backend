import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Query((returns) => [User])
  users(@Args('take', { type: () => Int }) take: number): Promise<User[]> {
    return this.usersService.findAll(take);
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOne(id);
  }

  @Query(() => User, { name: 'userByPhone' })
  findByPhone(@Args('phone') phone: string) {
    return this.usersService.findOneByPhone(phone);
  }

  @Query(() => User, { name: 'userByPassword' })
  findByPassword(@Args('password') password: string) {
    return this.usersService.findOneByPassword(password);
  }

  @Mutation((returns) => User)
  async updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<User> {
    return await this.usersService.update(updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.remove(id);
  }

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

  @Mutation(() => User)
  async removeUsers(@Args('ids', { type: () => [Int] }) ids: number[]) {
    return this.usersService.removeByIds(ids);
  }
}
