const mongoose = require('mongoose');

const bodyWeightSchema = new mongoose.Schema({
        weight:{
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

module.exports = BodyWeight = mongoose.model('bodyWeight', bodyWeightSchema);