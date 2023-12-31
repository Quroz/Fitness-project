const WorkoutModel = require("../models/WorkoutModel")




async function getWorkouts(req,res){

    const user_id = req.user._id
   


    try {
        const workouts = await WorkoutModel.find({user_id}).sort({createdAt: -1})
        res.status(200).json(workouts)
    } catch (error) {
        res.status(400).json({Error: error.message})
    }
}


async function addWorkout(req,res){
    const {name, bodyPart, muscleTarget, equipment, sets,reps} = req.body

    const errorMessages = []

    if(!name){
        errorMessages.push("name")
    }
    if(!bodyPart){
        errorMessages.push("bodyPart")
    }
    if(!muscleTarget){
        errorMessages.push("muscleTarget")
    }
    if(!equipment){
        errorMessages.push("equipment")
    }
    if(!reps){
        errorMessages.push("reps")
    }
    if(!sets){
        errorMessages.push("sets")
    }

    if(errorMessages.lenght > 0){
        return res.status(400).json({Error: errorMessages})
    }

    try {
        const user_id =  req.user._id
        const addedWorkout = await WorkoutModel.create({name,bodyPart, muscleTarget, equipment, sets,reps, user_id })
        res.status(200).json(addedWorkout)
    } catch (error) {
        res.status(400).json({Error: error.message})
    }
}


async function deleteWorkout(req, res) {
    const { id } = req.params;
    const user_id = req.user._id;

    try {
        const removedWorkout = await WorkoutModel.findOneAndDelete({ _id: id, user_id });
        if (!removedWorkout) {
            return res.status(404).json({ Error: "Workout not found" });
        }
        res.status(200).json(removedWorkout);
    } catch (error) {
        res.status(400).json({ Error: error.message });
    }
}

async function updateWorkout(req, res) {
    const { id } = req.params;
    const user_id = req.user._id;

    try {
        const updatedWorkout = await WorkoutModel.findOneAndUpdate({ _id: id, user_id }, req.body, { new: true });
        if (!updatedWorkout) {
            return res.status(404).json({ Error: "Workout not found" });
        }
        res.status(200).json(updatedWorkout);
    } catch (error) {
        res.status(400).json({ Error: error.message });
    }
}



module.exports = {addWorkout, getWorkouts,  deleteWorkout, updateWorkout}