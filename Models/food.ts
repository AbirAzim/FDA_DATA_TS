import { model, Schema } from 'mongoose';

const foodSchema = new Schema({
  fdc_id: String, // done
  name: String, // done
  NDB_number: String,
  data_type: String, // done
  blend_id: String,
  description: String, // done
  food_category_id: String, // done
  publication_date: String, // done
  blendCategory: String, // done
  foodCategory: String, // done
  foodCode: String, // done
  categoryId: { type: Schema.Types.ObjectId, ref: 'FoodCategory' },
  blendStatus: {
    // done
    type: String,
    enum: ['Active', 'Review', 'Archieved'],
    default: 'Archieved',
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  source: String, // done
  nutrients: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Nutrient',
    },
  ],
  portions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'FoodPortion',
    },
  ],
  createdAt: { type: Date, default: Date.now },
  hasUpdated: { type: Boolean, default: false },
});

const Food = model('Food', foodSchema);

export default Food;
