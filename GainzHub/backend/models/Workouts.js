const mongoose = require('mongoose');

const MuscleGroupSchema = new mongoose.Schema({
    MuscleGroup: {type: String},
    Workout: {type: String}

});

module.exports = Workouts = mongoose.model('workouts', MuscleGroupSchema);