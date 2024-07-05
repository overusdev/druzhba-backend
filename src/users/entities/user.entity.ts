import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'user_id',
  })
  @Field((type) => Int, { nullable: true })
  id: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  name: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  surname: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  patronymic: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  isAdmin: boolean;

  @Column({ nullable: true })
  @Field({ nullable: true })
  area: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  password: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  role: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  note: string;
}
