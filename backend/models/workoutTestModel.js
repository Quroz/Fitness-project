const mongoose = require("mongoose")
const Schema = mongoose.Schema

const WorkoutSchema = new Schema({

    name: {
        type: String,
        required: true,
    },
    bodyPart: {
        type: String,
        required: true
    },
    muscleTarget: {
        type: String,
        required: true
    },
    equipment: {
        type: String,
        required: true
    },
    sets: {
        type: Number,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
   
   plan_id: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    
}, {timestamps: true})

const WorkoutModel = mongoose.model("FitnessModelTEST", WorkoutSchema)

module.exports = WorkoutModel
