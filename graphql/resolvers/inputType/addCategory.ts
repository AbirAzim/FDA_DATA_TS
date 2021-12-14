import { InputType, Field } from 'type-graphql';

@InputType()
export default class AddCategoryInput {
  @Field()
  categoryId: String;

  @Field({ nullable: true })
  categoryName: String;
}
