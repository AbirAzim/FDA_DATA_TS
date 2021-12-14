import { InputType, Field } from 'type-graphql';

@InputType()
export default class AddNutrients {
  @Field()
  fdc_id: any;

  @Field({ nullable: true })
  nutrientLocation: string;
}
