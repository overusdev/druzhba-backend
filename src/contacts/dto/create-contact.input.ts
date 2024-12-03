import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateContactInput {
  @Field({ nullable: true })
  date: string;

  @Field({ nullable: true })
  updated: string;

  @Field({ nullable: true })
  theme: string;
}
