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

	async exercise_part(bodyPart: string, limit: number): Promise<void> {
		const apiKey = "3ad53db2c9mshfe8e68e512d7859p1086cejsne1b391663a8b";
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

		try{
			const response = await fetch(url, options);
			const result = await response.json();
			return result;
		} catch (error) {
			console.log(error);
		}
	},
};

export default Exercise_api;
