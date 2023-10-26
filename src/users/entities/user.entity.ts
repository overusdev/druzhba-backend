import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'user_id',
  })
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  surname: string;

  @Column()
  @Field()
  patronymic: string;

  @Column()
  @Field()
  isAdmin: boolean;

  @Column()
  @Field()
  area: string;

  @Column()
  @Field()
  phone: string;
}
