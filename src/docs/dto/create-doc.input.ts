import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateDocInput {
  @Field({ nullable: true })
  date: string;

  @Field({ nullable: true })
  updated: string;

  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  theme: string;
}
