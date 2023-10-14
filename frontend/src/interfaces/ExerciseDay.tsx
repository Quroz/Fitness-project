interface ExerciseDay {

	bodyPart: string;
	equipment: string;
	gifUrl: string;
	id: string;
	name: string;
	muscleTarget: string;
	secondaryMuscles: string[];
	instructions: string[];
	sets: number | null;
	reps: number | null;
}

export default ExerciseDay;
