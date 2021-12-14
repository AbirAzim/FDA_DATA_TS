import { Resolver, Mutation, Arg, Query } from 'type-graphql';
import csv from 'csvtojson';
import { GraphQLJSONObject } from 'graphql-type-json';

import AddFood from './inputType/addFood';
import AddCategory from './inputType/addCategory';
import AddNutrients from './inputType/addNutrients';
import AddFoodPortion from './inputType/addFoodPortion';
import AddNDB from './inputType/addNDB';

import Food from '../schemas/Food';
import PopulatedFood from '../schemas/populatedFood';
import FoodWithPopulatedNutrient from '../schemas/FoodWithPopulatedNutrient';

import FoodIdModel from '../../Models/blendFoodId';
import CategoryModel from '../../Models/category';
import NutrientDescriptionModel from '../../Models/nutrientDescription';
import NutrientModel from '../../Models/nutrient';
import PortionModel from '../../Models/portion';
import FoodModel from '../../Models/food';
import category from '../../Models/category';
import { query } from 'express';

@Resolver()
export default class BrandResolver {
  @Query(() => Food)
  async addNewFoodFoundationAndLegacy(@Arg('data') data: AddFood) {
    let file;
    let source;
    let nutrientLocation;
    let foodPortionLocation;
    let foodCategory;
    let NDBLocation;

    if (data.type === 'foundation_food') {
      file = './data/foundation/food.csv';
      source = 'usda-foundation';
      nutrientLocation = './data/foundation/food_nutrient.csv';
      foodPortionLocation = './data/foundation/food_portion.csv';
      NDBLocation = './data/foundation/foundation_food.csv';
    } else {
      file = './data/legacy/food.csv';
      source = 'usda-legacy';
      nutrientLocation = './data/legacy/food_nutrient.csv';
      foodPortionLocation = './data/legacy/food_portion.csv';
      NDBLocation = './data/legacy/sr_legacy_food.csv';
    }

    let foods = await csv().fromFile(file);
    let food: any = foods.filter((el) => el.fdc_id === data.fdc_id);
    let findFood = await FoodModel.findOne({ fdc_id: food[0].fdc_id });
    if (!findFood) {
      let categoryInfo = {
        categoryId: food[0].food_category_id,
        categoryName: data.blend_category ? data.blend_category : 'random',
      };
      foodCategory = await this.addCategoryName(categoryInfo);
      food[0].categoryId = foodCategory._id;
      food[0].foodCategory = foodCategory.description;

      if (data.blend_status) {
        food[0].blendStatus = data.blend_status;
      }

      let blendId = await FoodIdModel.findByIdAndUpdate(
        '61a74bd7e599f540a4cf1748',
        { $inc: { blend_id: 1 } },
        { new: true }
      );
      // console.log(foodCategory);
      // console.log(blendId.blend_id);
      if (blendId.blend_id < 10) {
        food[0].blend_id = foodCategory.initial + '0' + blendId.blend_id;
      } else {
        food[0].blend_id = foodCategory.initial + blendId.blend_id;
      }
      food[0].name = food[0].description.split(',')[0];
      food[0].source = source;
      food[0].blendCategory = data.blend_category ? data.blend_category : null;

      let NDB_number = await this.addNDBInfo({
        fdc_id: food[0].fdc_id,
        NDBLocation: NDBLocation,
      });

      food[0].NDB_number = NDB_number;

      let nutrientsIds = await this.getNutrients({
        fdc_id: food[0].fdc_id,
        nutrientLocation,
      });
      food[0].nutrients = nutrientsIds;
      let portionIds = await this.getPortions({
        fdc_id: food[0].fdc_id,
        foodPortionLocation,
      });
      food[0].portions = portionIds;
      let newFood = await FoodModel.create(food[0]);
      return newFood;
    }
    return findFood;
  }

  async addNDBInfo(data: AddNDB) {
    console.log(data);
    let ndbInfos = await csv().fromFile(data.NDBLocation);
    let ndbInfo = ndbInfos.filter((el) => el.fdc_id === data.fdc_id)[0];
    console.log(ndbInfo);
    return ndbInfo.NDB_number;
  }

  async addCategoryName(categoryInfo: AddCategory) {
    let searchedCategory = await csv().fromFile(
      './data/supporting/food_category.csv'
    );
    //@ts-ignore
    let category = searchedCategory.filter(
      (el) => el.id === categoryInfo.categoryId
    );
    category[0].categoryName = categoryInfo.categoryName;
    let findCategory = await CategoryModel.findOne({
      id: categoryInfo.categoryId,
    });
    if (!findCategory) {
      category[0].initial = category[0].categoryName
        .substring(0, 2)
        .toUpperCase();
      let cat = await CategoryModel.create(category[0]);
      return cat;
    }
    return findCategory;
  }

  async getNutrients(data: AddNutrients) {
    let nutrientsIds = [];
    let allNutrients = await csv().fromFile(data.nutrientLocation);
    let nutrients = allNutrients.filter(
      (el) => el.fdc_id === data.fdc_id && el.amount !== '0.0'
    );
    for (let i = 0; i < nutrients.length; i++) {
      let nutrient = await NutrientModel.findOne({
        nutrient_id: nutrients[i].nutrient_id,
      });
      if (!nutrient) {
        let nutrientDescriptionId = await this.maping(nutrients[i]);
        nutrients[i].nutrientDescription = nutrientDescriptionId;
        let newNutrient = await NutrientModel.create(nutrients[i]);
        nutrientsIds.push(newNutrient._id);
      } else {
        nutrientsIds.push(nutrient._id);
      }
    }
    return nutrientsIds;
    // let nutrientsDescriptionIds = await this.maping(nutrient);
  }

  async maping(data: typeof GraphQLJSONObject) {
    console.log(data);
    let jsonObj = await csv().fromFile('./data/supporting/nutrient.csv');

    // @ts-ignore
    let nutrientDescription = jsonObj.filter(
      // @ts-ignore
      (it) => data.nutrient_id === it.id
    )[0];
    // database stuff
    let findNutrientDescription = await NutrientDescriptionModel.findOne({
      id: nutrientDescription.id,
    });
    if (!findNutrientDescription) {
      let newNutrientDescription = await NutrientDescriptionModel.create(
        nutrientDescription
      );
      return newNutrientDescription._id;
    } else return findNutrientDescription._id;
  }

  async getPortions(data: AddFoodPortion) {
    let portionIds = [];
    let allPortions = await csv().fromFile(data.foodPortionLocation);
    let portions = allPortions.filter((el) => el.fdc_id === data.fdc_id);

    for (let i = 0; i < portions.length; i++) {
      let findPortion = await PortionModel.findOne({ fdc_id: data.fdc_id });
      if (!findPortion) {
        portions[i].measureUnitName = await this.getMeasureUnitName(
          portions[i].measure_unit_id
        );
        let portion = await PortionModel.create(portions[i]);
        portionIds.push(portion._id);
      } else portionIds.push(findPortion._id);
    }
    return portionIds;
  }

  async getMeasureUnitName(id: string) {
    console.log(id);
    let measureUnits = await csv().fromFile(
      './data/supporting/measure_unit.csv'
    );
    // @ts-ignore
    let measureUnit = measureUnits.filter((el) => el.id === id)[0];
    console.log(measureUnit);
    return measureUnit.name;
  }

  @Query(() => Food)
  async getServeyFood(@Arg('data') data: AddFood) {
    let foodCode;
    let foods = await csv().fromFile('./data/servey/food.csv');
    let food: any = foods.filter((el) => el.fdc_id === data.fdc_id)[0];
    let findFood = await FoodModel.findOne({ fdc_id: food.fdc_id });

    console.log(findFood);

    if (!findFood) {
      console.log('hello');
      food.name = food.description.split(',')[0];
      foodCode = await this.addFoodCode({
        fdc_id: food.fdc_id,
        NDBLocation: './data/servey/survey_fndds_food.csv',
      });

      food.foodCode = foodCode;
      food.source = 'usda-servey';

      if (data.blend_status) {
        food.blendStatus = data.blend_status;
      }

      let category = await this.getServeyCategory(food.fdc_id);

      food.food_category_id = category.wweia_category_number;
      food.foodCategory = category.description;
      food.categoryId = category._id;

      let nutrientsIds = await this.getNutrients({
        fdc_id: food.fdc_id,
        nutrientLocation: './data/servey/food_nutrient.csv',
      });
      food.nutrients = nutrientsIds;
      let portionIds = await this.getPortions({
        fdc_id: food.fdc_id,
        foodPortionLocation: './data/servey/food_portion.csv',
      });
      food.portions = portionIds;
      console.log(food);
      let newFood = await FoodModel.create(food);
      return newFood;
    }
    return findFood;
  }

  async addFoodCode(data: AddNDB) {
    let ndbInfos = await csv().fromFile(data.NDBLocation);
    let ndbInfo = ndbInfos.filter((el) => el.fdc_id === data.fdc_id)[0];
    return ndbInfo.food_code;
  }

  async getServeyCategory(fdc_id: String) {
    let serveyCategories = await csv().fromFile(
      './data/servey/survey_fndds_food.csv'
    );
    let category: any = serveyCategories.filter(
      (el) => el.fdc_id === fdc_id
    )[0];

    let findCategory = await CategoryModel.findOne({
      wweia_category_number: category.wweia_category_number,
    });
    if (!findCategory) {
      let categoryDescription = await this.getServeyCategoryDescription(
        category.wweia_category_number
      );
      category.description = categoryDescription;
      category.categoryName = categoryDescription.split(',')[0];
      category.id = category.wweia_category_number;
      category.code = category.food_code;
      category.initial = category.categoryName.substring(0, 2).toUpperCase();
      let newCategory = await CategoryModel.create(category);
      return newCategory;
    }
    return findCategory;
  }

  async getServeyCategoryDescription(category_number: string) {
    let serveyCategoryDescriptions = await csv().fromFile(
      './data/supporting/wweia_food_category.csv'
    );
    let serveyCategoryDescription = serveyCategoryDescriptions.filter(
      (el) => el.wweia_food_category === category_number
    )[0];
    return serveyCategoryDescription.wweia_food_category_description;
  }

  @Mutation(() => String)
  async DeleteAllDocuments() {
    await FoodModel.deleteMany({});
    await NutrientModel.deleteMany({});
    await NutrientDescriptionModel.deleteMany({});
    await PortionModel.deleteMany({});
    await CategoryModel.deleteMany({});
    return 'Deleted';
  }

  @Mutation(() => String)
  async storeAllReviewedData() {
    let reviewdData = await csv().fromFile(
      './data/ref_data/BlendingIngredients-Combined.csv'
    );

    for (let i = 0; i < reviewdData.length; i++) {
      if (reviewdData[i].fdc_id === '326135') continue;
      let mydata = {
        blend_status: 'Review',
        type: reviewdData[i].data_type,
        fdc_id: reviewdData[i].fdc_id,
      };

      if (reviewdData[i].data_type !== 'survey_fndds_food') {
        //@ts-ignore
        await this.addNewFoodFoundationAndLegacy(mydata);
      } else {
        //@ts-ignore
        await this.getServeyFood(mydata);
      }
    }

    return 'done';
  }

  @Query(() => [PopulatedFood])
  async getFoodWithFoodName(@Arg('foodName') foodName: String) {
    var regexp = new RegExp(`[a-zA-Z0-9\s]*${foodName}[a-zA-Z0-9\s]*`, 'i');
    const items: any = await FoodModel.find({
      description: regexp,
    })
      .populate('nutrients')
      .populate('portions')
      .populate('categoryId');
    return items;
  }

  @Query(() => PopulatedFood)
  async getFoodWithId(@Arg('foodId') foodId: String) {
    const item: any = await FoodModel.findOne({
      _id: foodId,
    })
      .populate('nutrients')
      .populate('portions')
      .populate('categoryId');
    return item;
  }

  @Query(() => FoodWithPopulatedNutrient)
  async getAllTheNutrients(@Arg('foodId') foodId: String) {
    let foodWithNutrient = await FoodModel.findOne({ _id: foodId }).populate({
      path: 'nutrients',
      sort: { 'nutrients.nutrientDescription.rank': -1 },
      populate: {
        path: 'nutrientDescription',
        model: 'NutrientDescription',
      },
    });

    console.log(foodWithNutrient);

    return foodWithNutrient;
  }

  // @Field()
  // fdc_id: String;

  // @Field()
  // type: String;

  // @Field({ nullable: true })
  // blend_category: String;

  // @Field({ nullable: true })
  // blend_status: String;
}

// id: String,
// code: String,
// description: String,
// categoryName: String,
// createdAt: { type: Date, default: Date.now },
// initial: String,

//   nutrients: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: 'Nutrient',
//     },
//   ],
//   portions: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: 'Portion',
//     },
//   ],
