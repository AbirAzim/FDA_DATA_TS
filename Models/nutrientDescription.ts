import { model, Schema } from 'mongoose';

const nutrientDescriptionSchema = new Schema({
  id: String,
  name: String,
  unitName: String,
  nutrient_nbr: String,
  rank: String,
});

const NutrientDescription = model(
  'NutrientDescription',
  nutrientDescriptionSchema
);

export default NutrientDescription;
