import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAdInput {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  date: string;

  @Field({ nullable: true })
  theme: string;
}
