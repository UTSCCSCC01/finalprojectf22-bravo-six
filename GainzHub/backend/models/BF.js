const mongoose = require('mongoose');

const BFSchema = new mongoose.Schema({
        BF:{
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

module.exports = BF = mongoose.model('BF', BFSchema);