const WorkoutModel = require("../models/workoutTestModel")




async function getWorkouts(req,res){

    const user_id = req.user._id
    const {plan_id} = req.body

   
    try {
        const workouts = await WorkoutModel.find({user_id, plan_id}).sort({createdAt: -1})
        res.status(200).json(workouts)
    } catch (error) {
        res.status(400).json({Error: error.message})
    }
}


async function addWorkout(req,res){
    const {day, planName, type,name, bodyPart, muscleTarget, equipment, sets,reps, plan_id, check} = req.body

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
        const user_id = req.user._id;
 
        const addedWorkout = await WorkoutModel.create({day, planName, type,name, bodyPart, muscleTarget, equipment, sets,reps, plan_id, user_id, check});
       
        res.status(200).json(addedWorkout);
      } catch (error) {
        res.status(400).json({ Error: error.message });
      }
      
}


async function deleteWorkout(req, res) {
    const user_id = req.user._id
    const {plan_id,name } = req.body


    try {
        const removedWorkout = await WorkoutModel.findOneAndDelete({ user_id, plan_id,name });
        if (!removedWorkout) {
            return res.status(404).json({ Error: "Workout not found" });
        }
        res.status(200).json(removedWorkout);
    } catch (error) {
        res.status(400).json({ Error: error.message });
    }
}

//delete function for deleting a workoutplan
async function deleteAllWorkouts(req, res) {
    const user_id = req.user._id
    const {plan_id} = req.body


    try {
        const removedWorkout = await WorkoutModel.deleteMany({ user_id, plan_id });
        if (!removedWorkout) {
            return res.status(404).json({ Error: "Workout not found" });
        }
        res.status(200).json(removedWorkout);
    } catch (error) {
        res.status(400).json({ Error: error.message });
    }
}

async function updateWorkout(req, res) {
    const {name, bodyPart, muscleTarget, equipment, sets,reps, plan_id} = req.body;
    const user_id = req.user._id;
    const update = {name, bodyPart, muscleTarget, equipment, sets,reps}

    try {
        const updatedWorkout = await WorkoutModel.findOneAndUpdate({ plan_id, user_id }, update, { new: true });
        if (!updatedWorkout) {
            return res.status(404).json({ Error: "Workout not found" });
        }
        res.status(200).json(updatedWorkout);
    } catch (error) {
        res.status(400).json({ Error: error.message });
    }
}

async function checkWorkout(req, res) {
    const { check, plan_id, name } = req.body;
    const user_id = req.user._id;

    try {
        const update = { check };

        const updatedWorkout = await WorkoutModel.findOneAndUpdate(
            { plan_id, user_id, name },
            update,
            { new: true }
        );

        if (!updatedWorkout) {
            return res.status(404).json({ Error: "Workout not found" });
        }

        res.status(200).json(updatedWorkout);
    } catch (error) {
        res.status(400).json({ Error: error.message });
    }
}





module.exports = {addWorkout, getWorkouts,  deleteWorkout, updateWorkout, deleteAllWorkouts, checkWorkout}