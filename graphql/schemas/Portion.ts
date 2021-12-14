import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export default class Portion {
  @Field((type) => ID)
  _id: String | undefined;
  @Field({ nullable: true })
  fdc_id: String;
  @Field({ nullable: true })
  seq_num: String;
  @Field({ nullable: true })
  amount: String;
  @Field({ nullable: true })
  measure_unit_id: String;
  @Field({ nullable: true })
  portion_description: String;
  @Field({ nullable: true })
  modifier: String;
  @Field({ nullable: true })
  gram_weight: String;
  @Field({ nullable: true })
  data_points: String;
  @Field({ nullable: true })
  footnote: String;
  @Field({ nullable: true })
  min_year_acquired: String;
  @Field({ nullable: true })
  measureUnitName: String;
}

// id: String,
// fdc_id: String,
// seq_num: String,
// amount: String,
// measure_unit_id: String,
// portion_description: String,
// modifier: String,
// gram_weight: String,
// data_points: String,
// footnote: String,
// min_year_acquired: String,
// measureUnitName: String,
