import { model, Schema } from 'mongoose';

const foodPortionSchema = new Schema({
  id: String,
  fdc_id: String,
  seq_num: String,
  amount: String,
  measure_unit_id: String,
  portion_description: String,
  modifier: String,
  gram_weight: String,
  data_points: String,
  footnote: String,
  min_year_acquired: String,
  measureUnitName: String,
});

const FoodPortion = model('FoodPortion', foodPortionSchema);

export default FoodPortion;
