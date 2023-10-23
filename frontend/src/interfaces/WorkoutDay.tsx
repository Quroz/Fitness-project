import ExerciseDay from "./ExerciseDay";

interface WorkoutDay {
  plan_id: number;
  workoutDay: string;
  workoutName: string;
  exercises: ExerciseDay[];
}

export default WorkoutDay;