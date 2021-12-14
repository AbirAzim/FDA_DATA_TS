import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export default class Food {
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
  @Field((type) => ID, { nullable: true })
  categoryId: String;
  @Field((type) => [ID], { nullable: true })
  nutrients: [String];
  @Field((type) => [ID], { nullable: true })
  portions: [String];
  @Field((type) => Date, { nullable: true })
  createdAt: Date;
  @Field({ nullable: true })
  hasUpdated: Boolean;
}

// fdc_id: String, // done
// name: String, // done
// data_type: String, // done
// blend_id: String,
// description: String, // done
// food_category_id: String, // done
// publication_date: String, // done
// blendCategoy: String, // done
// foodCategory: String, // done
// categoryId: { type: Schema.Types.ObjectId, ref: 'FoodCategory' },
// blendStatus: {
//   // done
//   enum: ['Active', 'Review', 'Archieved'],
//   default: 'Archieved',
// },
// isPublished: {
//   type: Boolean,
//   default: false,
// },
// source: String, // done
// nutrients: [
//   {
//     type: Schema.Types.ObjectId,
//     ref: 'Nutrient',
//   },
// ],
// portions: [
//   {
//     type: Schema.Types.ObjectId,
//     ref: 'Portion',
//   },
// ],
// createdAt: { type: Date, default: Date.now },
// hasUpdated: { type: Boolean, default: false },
