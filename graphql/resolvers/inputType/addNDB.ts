import { InputType, Field } from 'type-graphql';

@InputType()
export default class AddNDB {
  @Field()
  fdc_id: any;

  @Field({ nullable: true })
  NDBLocation: string;
}
