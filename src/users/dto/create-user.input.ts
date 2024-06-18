import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  // @Field(() => Int, { description: 'Example field (placeholder)' })
  // user_id: string;

  @Field()
  name: string;

  @Field()
  surname: string;

  @Field({ nullable: true })
  patronymic: string;
}
