import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AuthInput {
  @Field()
  phone: string;

  @Field()
  password: string;
}
