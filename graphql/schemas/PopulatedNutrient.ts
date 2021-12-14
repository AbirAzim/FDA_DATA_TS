import { Field, ID, ObjectType } from 'type-graphql';
import NutrientDescription from './NutrientDescription';

@ObjectType()
export default class PopulatedNutrient {
  @Field((type) => ID)
  _id: string | undefined;
  @Field({ nullable: true })
  id: String;
  @Field({ nullable: true })
  fdc_id: String;
  @Field({ nullable: true })
  nutrient_id: String;
  @Field({ nullable: true })
  amount: String;
  @Field({ nullable: true })
  data_points: String;
  @Field({ nullable: true })
  derivation_id: String;
  @Field({ nullable: true })
  min: String;
  @Field({ nullable: true })
  max: String;
  @Field({ nullable: true })
  median: String;
  @Field({ nullable: true })
  footnote: String;
  @Field({ nullable: true })
  min_year_accumulation: String;
  @Field((type) => NutrientDescription, { nullable: true })
  nutrientDescription: NutrientDescription;
}
