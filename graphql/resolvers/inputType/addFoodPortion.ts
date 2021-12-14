import { InputType, Field } from 'type-graphql';

@InputType()
export default class AddFoodPortionInput {
  @Field()
  fdc_id: any;

  @Field({ nullable: true })
  foodPortionLocation: string;
}
