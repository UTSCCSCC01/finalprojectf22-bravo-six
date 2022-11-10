const mongoose = require('mongoose');

const BMISchema = new mongoose.Schema({
        BMI:{
            type: Number
        },
        date:{
            type: String
        },
        userId:{
            type: String,
            required: true,
        }
    });

module.exports = BMI = mongoose.model('BMI', BMISchema);