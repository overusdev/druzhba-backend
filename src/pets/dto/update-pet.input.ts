import { CreatePetInput } from './create-pet.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePetInput extends PartialType(CreatePetInput) {
  @Field(() => Int, { nullable: true })
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  type?: string;
}
