const mongoose = require('mongoose');
const SocialPostSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true,
    },
    PostMessage:{
        type:String,
        required: true,
    }
});

module.exports = MealPlan = mongoose.model('socialpost', SocialPostSchema);