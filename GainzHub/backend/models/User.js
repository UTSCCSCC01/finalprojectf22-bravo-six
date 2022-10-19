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
        }
    }]
});

module.exports = User = mongoose.model('user', UserSchema);