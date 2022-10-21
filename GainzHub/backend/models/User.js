const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true
    },
    password:{
        type: String,
        unique: true
    },
    username:{
        type: String,
        unique: true
    },
    calorieGoal:{
        type: Number,
        default: 0
    },
    caloriesAte:{
        type: Number,
        default: 0
    },
    food:[{
        foodName:{
            type: String
        },
        foodCalories:{
            type: Number
        },
        foodProtein:{
            type: Number
        },
        foodCarbs:{
            type: Number
        },
        foodFat:{
            type: Number
        },
        foodSugar:{
            type: Number
        },
        foodSodium:{
            type: Number
        }}],
    personalMealPlans:[{
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
        }
    }]
});

module.exports = User = mongoose.model('user', UserSchema);