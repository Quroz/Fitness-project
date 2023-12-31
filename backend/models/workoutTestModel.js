const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    exercises: [
        {
            name: {
                type: String,
                required: true,
            },
            bodyPart: {
                type: String,
                required: true,
            },
            equipment: {
                type: String,
                required: true,
            },
            sets: {
                type: Number,
                required: true,
            },
            reps: {
                type: Number,
                required: true,
            },
        }
    ],
    completedWorkouts: [
        {
            workout: [
                {
                    name: {
                        type: String,
                        required: false,
                    },
                    bodyPart: {
                        type: String,
                        required: false,
                    },
                    equipment: {
                        type: String,
                        required: false,
                    },
                    completedSets: [{
                        reps: {
                            type: Number,
                            required: false
                        },
                        weight: {
                            type: Number,
                            required: false
                        }
                    }]
                }
            ],
            date: {
                type: String,
                required: false
            }
        }
    ],
    workoutName: {
        type: String,
        required: true,
    },
    workoutDay: {
        type: String,
        required: true,
    },
    plan_id: {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const WorkoutModel = mongoose.model("FitnessModeldo", WorkoutSchema);

module.exports = WorkoutModel;
