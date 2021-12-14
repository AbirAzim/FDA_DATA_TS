import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export default class Category {
  @Field((type) => ID)
  _id: String | undefined;
  @Field({ nullable: true })
  fdc_id: String;
  @Field({ nullable: true })
  foodCode: String;
  @Field({ nullable: true })
  wweia_category_number: String;
  @Field({ nullable: true })
  start_date: String;
  @Field({ nullable: true })
  end_date: String;
  @Field({ nullable: true })
  id: String;
  @Field({ nullable: true })
  code: String;
  @Field({ nullable: true })
  description: String;
  @Field({ nullable: true })
  categoryName: String;
  @Field({ nullable: true })
  initial: String;
  @Field({ nullable: true })
  blendStatus: String;
  @Field((type) => Date, { nullable: true })
  createdAt: Date;
}

// fdc_id: String,
// food_code: String,
// wweia_category_number: String,
// start_date: String,
// end_date: String,
// id: String,
// code: String,
// description: String,
// categoryName: String,
// createdAt: { type: Date, default: Date.now },
// initial: String,
