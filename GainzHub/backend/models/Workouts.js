const mongoose = require('mongoose');

const MuscleGroupSchema = new mongoose.Schema({
    MuscleGroup: {type: String},
    Workout: {type: String}

});

module.exports = MuscleGroupModel = mongoose.model('workouts', MuscleGroupSchema);