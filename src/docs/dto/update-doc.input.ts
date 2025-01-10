import { CreateDocInput } from './create-doc.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateDocInput extends PartialType(CreateDocInput) {
  @Field(() => Int)
  id: number;
}
