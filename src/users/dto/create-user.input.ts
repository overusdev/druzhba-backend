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
  date: string;

  @Field({ nullable: true })
  updated: string;

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
  bcryptpassword: string;

  @Field()
  role: string;

  @Field()
  note: string;
}
