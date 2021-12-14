import { model, Schema } from 'mongoose';

const foodIdSchema = new Schema({
  blend_id: Number,
  createdAt: { type: Date, default: Date.now },
});

const FoodId = model('FoodId', foodIdSchema);

export default FoodId;