const WorkoutModel = require("../models/workoutTestModel");


async function getWorkouts(req, res) {
    const user_id = req.user._id;
    //const { plan_id } = req.body;

    try {
        const workouts = await WorkoutModel.find({ user_id }).sort({ createdAt: -1 });
      
        res.status(200).json(workouts);
    } catch (error) {
        res.status(400).json({ Error: error.message });
    }
}

async function getExercises(req, res) {
    const user_id = req.user._id;
    const { plan_id } = req.body; 

    try {
      
        const workouts = await WorkoutModel.find({ user_id, plan_id });

        if (!workouts) {
            return res.status(404).json({ Error: "No workouts found for the specified plan_id" });
        }

      
        const exercises = workouts.map((workout) => workout.exercises).flat();

        res.status(200).json(exercises);
    } catch (error) {
        res.status(400).json({ Error: error.message });
    }
}


async function addWorkout(req, res) {
    const { exercises, workoutName, workoutDay, plan_id } = req.body;

    try {
        const user_id = req.user._id;
        const addedWorkout = await WorkoutModel.create({
            exercises,
            workoutName,
            workoutDay,
            plan_id,
            user_id,
        });

        res.status(200).json(addedWorkout);
    } catch (error) {
        res.status(400).json({ Error: error.message });
    }
}

async function addCompletedWorkout(req,res){
    const { workout, plan_id, date } = req.body;
   

    try {
        const user_id = req.user._id;
        const existingWorkout = await WorkoutModel.findOne({ plan_id, user_id });

        if (!existingWorkout) {
            return res.status(404).json({ Error: "Workout not found" });
        }

        const completedWorkout = existingWorkout.completedWorkouts;
        completedWorkout.push({workout, date});
        const updatedWorkout = await existingWorkout.save();

        res.status(200).json(updatedWorkout);
    } catch (error) {
        res.status(400).json({ Error: error.message });
    }
}


async function addExerciseToWorkout(req, res) {
    const user_id = req.user._id;
    const { plan_id, exercises } = req.body;

    try {
    
        const existingWorkout = await WorkoutModel.findOne({ plan_id, user_id });

        if (!existingWorkout) {
            return res.status(404).json({ Error: "Workout not found" });
        }

       
        exercises.forEach((exercise) => {
            existingWorkout.exercises.push(exercise);
        });

       
        const updatedWorkout = await existingWorkout.save();

        res.status(200).json(updatedWorkout);
    } catch (error) {
        res.status(400).json({ Error: error.message });
    }
}




async function deleteWorkout(req, res) {
    const user_id = req.user._id;
    const { plan_id, name } = req.body;

    try {
        const removedWorkout = await WorkoutModel.findOneAndDelete({ user_id, plan_id, 'exercises.name': name });
        if (!removedWorkout) {
            return res.status(404).json({ Error: "Workout not found" });
        }
        res.status(200).json(removedWorkout);
    } catch (error) {
        res.status(400).json({ Error: error.message });
    }
}


async function deleteAllWorkouts(req, res) {
    const user_id = req.user._id;
    const { plan_id } = req.body;

    try {
        const removedWorkouts = await WorkoutModel.deleteMany({ user_id, plan_id });
        if (!removedWorkouts) {
            return res.status(404).json({ Error: "Workouts not found" });
        }
        res.status(200).json(removedWorkouts);
    } catch (error) {
        res.status(400).json({ Error: error.message });
    }
}

async function deleteExerciseFromWorkout(req, res) {
    const user_id = req.user._id;
    const { plan_id, exercise_id } = req.body;

    try {
        const existingWorkout = await WorkoutModel.findOne({ user_id, plan_id });
        

        if (!existingWorkout) {
            return res.status(404).json({ Error: "Workout not found" });
        }

   
        if (exercise_id < 0 || exercise_id >= existingWorkout.exercises.length) {
            return res.status(400).json({ Error: "Invalid exercise index" });
        }


        existingWorkout.exercises.splice(exercise_id, 1);

       
        const updatedWorkout = await existingWorkout.save();

        res.status(200).json(updatedWorkout);
    } catch (error) {
        res.status(400).json({ Error: error.message });
    }
}



async function updateWorkout(req, res) {
    const { exercises, workoutName, workoutDay, plan_id, name } = req.body;
    const user_id = req.user._id;

    try {
        const updatedWorkout = await WorkoutModel.findOneAndUpdate(
            { user_id, plan_id, 'exercises.name': name },
            { exercises, workoutName, workoutDay },
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


async function checkWorkout(req, res) {
    const { check, plan_id, name } = req.body;
    const user_id = req.user._id;

    try {
        const updatedWorkout = await WorkoutModel.findOneAndUpdate(
            { user_id, plan_id, 'exercises.name': name },
            { $push: { 'exercises.$.check': { $each: check } } },
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

module.exports = { addWorkout, getWorkouts, deleteWorkout, updateWorkout, deleteAllWorkouts, checkWorkout, addExerciseToWorkout, getExercises, deleteExerciseFromWorkout, addCompletedWorkout };
