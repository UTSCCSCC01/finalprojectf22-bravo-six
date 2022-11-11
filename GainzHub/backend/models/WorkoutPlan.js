const mongoose = require('mongoose');

const WorkoutPlanSchema = new mongoose.Schema({
    planName:{
        type:String,
        required:true,
    },
    description:{
        type:String
    },
    workouts: [{
        workoutId:{
            type: String,
            required: true,
        },
        sets:[{
            setNum:{
                type: Number,
                required: true,
            },
            lbs:{
                type: Number,
                required: true,
            },
            reps:{
                type: Number,
                required: true,
            }
        }]
    }]
});

module.exports = WorkoutPlan = mongoose.model('WorkoutPlans', WorkoutPlanSchema);