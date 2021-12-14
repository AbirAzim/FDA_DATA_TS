import { Field, ID, ObjectType } from 'type-graphql';
import Nutrient from './Nutrient';
import Category from './Category';
import Portion from './Portion';

@ObjectType()
export default class PopulatedFood {
  @Field((type) => ID)
  _id: String | undefined;
  @Field({ nullable: true })
  fdc_id: String;
  @Field({ nullable: true })
  NDB_number: String;
  @Field({ nullable: true })
  name: String;
  @Field({ nullable: true })
  data_type: String;
  @Field({ nullable: true })
  blend_id: String;
  @Field({ nullable: true })
  description: String;
  @Field({ nullable: true })
  food_category_id: String;
  @Field({ nullable: true })
  publication_date: String;
  @Field({ nullable: true })
  blendCategory: String;
  @Field({ nullable: true })
  foodCategory: String;
  @Field({ nullable: true })
  source: String;
  @Field({ nullable: true })
  blendStatus: String;
  @Field((type) => Category, { nullable: true })
  categoryId: Category;
  @Field((type) => [Nutrient], { nullable: true })
  nutrients: [Nutrient];
  @Field((type) => [Portion], { nullable: true })
  portions: [Portion];
  @Field((type) => Date, { nullable: true })
  createdAt: Date;
  @Field({ nullable: true })
  hasUpdated: Boolean;
}
