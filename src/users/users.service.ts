import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, In, Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  create(createUserInput: CreateUserInput): Promise<User> {
    const newUser = this.usersRepository.create(createUserInput);

    return this.usersRepository.save(newUser);
  }

  async findAll(take: number): Promise<User[]> {
    const getQuery = {
      take,
      order: {
        id: 'DESC',
      },
    };
    return this.usersRepository.find(getQuery as FindManyOptions); // SELECT * users
  }

  async findOne(id): Promise<User> {
    return this.usersRepository.findOneBy({ id: id }); // SELECT user by id
  }

  async remove(id: number): Promise<number | string> {
    await this.usersRepository.delete({ id: id });
    const message = `User with id ${id} was removed`;
    return message;
  }

  async removeByIds(ids: number[]): Promise<number | string> {
    await this.usersRepository.delete([...ids]);
    const message = `Users with id ${ids} was removed`;
    return message;
  }

  async update(updateUserInput: UpdateUserInput): Promise<User> {
    await this.usersRepository.update(
      { id: updateUserInput.id },
      { ...updateUserInput },
    );
    return await this.findOne(updateUserInput.id);
  }
  // update(id: number, updateUserInput: UpdateUserInput) {
  //   return `This action updates a #${id} user`;
  // }
}
