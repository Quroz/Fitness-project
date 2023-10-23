interface ExerciseDay {
	bodyPart: string;
	equipment: string;
	gifUrl: string;
	id: string;
	name: string;
	muscleTarget: string;
	secondaryMuscles: string[];
	instructions: string[];
	sets: number;
	reps: number;
}

export default ExerciseDay;
