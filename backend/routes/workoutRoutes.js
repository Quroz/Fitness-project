const express = require("express")
const router = express.Router()
//const {getWorkouts, addWorkout, deleteWorkout, updateWorkout} = require("../controllers/workoutController")
const {getWorkouts, addWorkout, deleteWorkout, updateWorkout, deleteAllWorkouts, checkWorkout} = require("../controllers/workoutTestController")
const requireAuth = require("../middleware/requireAuth")

router.use(requireAuth)

router.post("/",  getWorkouts)
router.post("/add", addWorkout)
router.post("/check", checkWorkout)
router.post("/delete", deleteWorkout )
router.post("/deleteAllWorkouts", deleteAllWorkouts )
router.post("/update", updateWorkout)

module.exports = router

