import Exercise from "../interfaces/Exercise";

const Base_URL = "https://exercisedb.p.rapidapi.com/exercises";
const options = {
	method: "GET",
	headers: {
		"X-RapidAPI-Key": "8a354e8a27msh1bad040c9cceae5p1e730fjsn03fd27ba67a5",
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
				`${Base_URL}/name/${name.toLowerCase()}?limit=${limit}`,
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
		const apiKey = "92861afaf7mshcb88a59aa5a8a33p17a34djsnf27ce4eb51d4";
		const host = "exercisedb.p.rapidapi.com";

		// Construct the URL with the provided bodyPart and limit
		const url = `https://${host}/exercises/bodyPart/${encodeURIComponent(
			bodyPart
		)}?limit=${limit}`;

		const options = {
			method: "GET",
			headers: {
				"X-RapidAPI-Key": "8a354e8a27msh1bad040c9cceae5p1e730fjsn03fd27ba67a5",
				"X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
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
