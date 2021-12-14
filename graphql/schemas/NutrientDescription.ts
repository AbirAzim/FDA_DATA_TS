// id: String,
// name: String,
// unitName: String,
// nutrient_nbr: String,
// rank: String,

import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export default class NutrientDescription {
  @Field((type) => ID)
  _id: string | undefined;
  @Field({nullable: true})
  id: String;
  @Field({nullable: true})
  name: String;
  @Field({nullable: true})
  unitName: String;
  @Field({nullable: true})
  nutrient_nbr: String;
  @Field({nullable: true})
  rank: String;
}