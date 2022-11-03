const mongoose = require('mongoose');

const MealPlanSchema = new mongoose.Schema({
        planName:{
            type:String
        },
        breakfastMeal:{
            type: String
        },
        breakfastIngredients:{
            type: String,
            required: false
        },
        breakfastCalories:{
            type: Number
        },
        breakfastProtein:{
            type: Number
        },
        lunchMeal:{
            type: String
        },
        lunchIngredients:{
            type: String,
            required: false
        },
        lunchCalories:{
            type: Number
        },
        lunchProtein:{
            type: Number
        },
        dinnerMeal:{
            type: String
        },
        dinnerIngredients:{
            type: String,
            required: false
        },
        dinnerCalories:{
            type: Number
        },
        dinnerProtein:{
            type: Number
        },        
        snacks:{
            type: String
        },
        snackCalories:{
            type: Number
        },
        snackProtein:{
            type: Number
        },
        published:{
            type: Boolean,
            default: false,
        },
        userId:{
            type: String,
            required: true,
        },
        review:{
            type: Number,
            required: false,
        }
    });

module.exports = MealPlan = mongoose.model('mealplan', MealPlanSchema);