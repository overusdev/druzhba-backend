import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Doc {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'doc_id',
  })
  @Field((type) => Int, { nullable: true })
  id: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  date: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  updated: string;

  @Column()
  @Field({ nullable: true })
  title: string;

  @Column('longtext')
  @Field({ nullable: true })
  theme: string;
}
