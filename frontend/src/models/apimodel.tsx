interface Exercise {
	bodyPart: string;
	equipment: string;
	gifUrl: string;
	id: string;
	name: string;
	target: string;
	secondaryMuscles: string[];
	instructions: string[];
}

const Base_URL = "https://exercisedb.p.rapidapi.com/exercises";
const options = {
	method: "GET",
	headers: {
		"X-RapidAPI-Key": "083914206emsh11d92ddfb433948p11023ajsnd520bb0564e2",
		"X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
	},
};

const Exercise_api = {
	async exercises_call(limit: number): Promise<Exercise[]> {
		try {
			const response = await fetch(`${Base_URL}?limit=${limit}`, options);
			const data = await response.json();
			return data;
		} catch (error) {
			console.error("Error fetching exercises:", error);
			return [];
		}
	},

	async exercise_name(name: string, limit: number): Promise<Exercise[]> {
		try {
			const response = await fetch(
				`${Base_URL}/name/${name}?limit=${limit}`,
				options
			);
			const data = await response.json();
			return data;
		} catch (error) {
			console.error("Error fetching exercises by name:", error);
			return [];
		}
	},

	async exercise_id(id_number: number): Promise<Exercise[]> {
		try {
			const response = await fetch(
				`${Base_URL}/exercise/${id_number}`,
				options
			);
			const data = await response.json();
			return data;
		} catch (error) {
			console.error("Error fetching exercises by ID:", error);
			return [];
		}
	},

	async exercise_part(bodyPart: string, limit: number): Promise<Exercise[]> {
		const apiKey = "b8802008cdmshb023a9cb3bfacf0p158be1jsn126cff83cac9";
		const host = "exercisedb.p.rapidapi.com";

		// Construct the URL with the provided bodyPart and limit
		const url = `https://${host}/exercises/bodyPart/${encodeURIComponent(
			bodyPart
		)}?limit=${limit}`;

		const options = {
			method: "GET",
			headers: {
				"X-RapidAPI-Key": apiKey,
				"X-RapidAPI-Host": host,
			},
		};

		try {
			const response = await fetch(url, options);
			const result = await response.json();
			return result;
		} catch (error) {
			console.error("Error fetching exercises by body part:", error);
			return [];
		}
	},
};

export default Exercise_api;
