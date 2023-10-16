import Workout from "./WorkoutInterface"
interface CompWorkouts {
    name: string;
    workout: {
      workout: Workout[];
      date: string;
    };
  }
  export default CompWorkouts;