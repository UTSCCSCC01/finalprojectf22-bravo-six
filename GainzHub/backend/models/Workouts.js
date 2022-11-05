const mongoose = require('mongoose');

const MuscleGroupSchema = new mongoose.Schema({
    MuscleGroup: {type: String},
    Workout: {type: String}

});
MuscleGroupSchema.index({MuscleGroup: "text", Workout: "text"});
module.exports = Workouts = mongoose.model('workouts', MuscleGroupSchema);