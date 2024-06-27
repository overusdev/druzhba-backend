import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class News {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'news_id',
  })
  @Field((type) => Int, { nullable: true })
  id: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  name: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  date: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  theme: string;
}
