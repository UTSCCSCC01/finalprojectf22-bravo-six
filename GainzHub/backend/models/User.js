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
    nutrition:{
        calorieGoal:{
            type: Number
        },
        caloriesAte: {
            type: Number
        },
        carbs: {
            type: Number
        },
        protein: {
            type: Number
        },
        fat: {
            type: Number
        },
        soduim: {
            type: Number
        },
        vitaminA: {
            type: Number
        },
        vitaminD: {
            type: Number
        }
    }
});

module.exports = User = mongoose.model('user', UserSchema);