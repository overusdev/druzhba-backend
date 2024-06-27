import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateNewsInput {
  // @Field(() => Int, { description: 'Example field (placeholder)' })
  // user_id: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  date: string;

  @Field({ nullable: true })
  theme: string;
}
