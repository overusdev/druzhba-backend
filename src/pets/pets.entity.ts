import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Pet {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'pet_id',
  })
  @Field((type) => Int, { nullable: true })
  id: number;

  @Column()
  @Field({ nullable: true })
  name?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  type?: string;
}
