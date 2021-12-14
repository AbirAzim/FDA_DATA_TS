import { model, Schema } from 'mongoose';

const foodCategorySchema = new Schema({
  fdc_id: String,
  food_code: String,
  wweia_category_number: String,
  start_date: String,
  end_date: String,
  id: String,
  code: String,
  description: String,
  categoryName: String,
  createdAt: { type: Date, default: Date.now },
  initial: String,
});

const FoodCategory = model('FoodCategory', foodCategorySchema);

export default FoodCategory;
