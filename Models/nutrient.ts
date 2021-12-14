import { model, Schema } from 'mongoose';

const nutrientSchema = new Schema({
  id: String,
  fdc_id: [String],
  nutrient_id: String,
  amount: String,
  data_points: String,
  derivation_id: String,
  min: String,
  max: String,
  median: String,
  footnote: String,
  min_year_accumulation: String,
  nutrientDescription: {
    type: Schema.Types.ObjectId,
    ref: 'NutrientDescription',
  },
});

const Nutrient = model('Nutrient', nutrientSchema);

export default Nutrient;
