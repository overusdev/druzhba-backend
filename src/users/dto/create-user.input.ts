import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  // @Field(() => Int, { description: 'Example field (placeholder)' })
  // user_id: string;

  @Field()
  name: string;

  @Field()
  surname: string;

  @Field()
  patronymic: string;

  @Field({ nullable: true })
  isAdmin?: boolean;

  @Field()
  area: string;

  @Field()
  phone: string;

  @Field()
  password: string;

  @Field()
  role: string;
}
