import { InputType, Field } from 'type-graphql';

@InputType()
export default class AddFoodInput {
  @Field()
  fdc_id: String;

  @Field()
  type: String;

  @Field({ nullable: true })
  blend_category: String;

  @Field({ nullable: true })
  blend_status: String;
}
