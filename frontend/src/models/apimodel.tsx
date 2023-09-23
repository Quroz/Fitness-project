const Base_URL = "https://exercisedb.p.rapidapi.com/exercises";
const options = {
	method: "GET",
	headers: {
		"X-RapidAPI-Key": "083914206emsh11d92ddfb433948p11023ajsnd520bb0564e2",
		"X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
	},
};

const Exercise_api = {
	/*Working */
	async exercises_call(limit: number) {
		return fetch(Base_URL + "?limit=" + limit, options)
			.then((response) => response.json())
			.then((data) => {
				return data;
			});
	},

	/*Working */
	async exercise_name(name: string, limit: number) {
		return fetch(Base_URL + "/name/" + name + "?/limit=" + limit, options)
			.then((response) => response.json())
			.then((data) => {
				return data;
			});
	},

	/*Working */
	async exercise_id(id_number: number) {
		return fetch(Base_URL + "/exercise/" + id_number, options)
			.then((response) => response.json())
			.then((data) => {
				return data;
			});
	},

	async exercise_part(bodyPart: string, limit: number) {
		const url = `${Base_URL}/bodyPart/${bodyPart}?limit=${limit}`;
		const options = {
			method: "GET",
			headers: {
				"X-RapidAPI-Key": "083914206emsh11d92ddfb433948p11023ajsnd520bb0564e2",
				"X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
			},
		};
		try {
			const response = await fetch(url, options);

			if (!response.ok) {
				throw new Error("Network response was not ok");
			}

			const data = await response.json();
			return data;
		} catch (error) {
			console.error("Error fetching exercise data:", error);
			return []; // Return an empty array in case of an error
		}
	},
};

export default Exercise_api;
