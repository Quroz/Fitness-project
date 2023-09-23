const Base_URL = "https://exercisedb.p.rapidapi.com/exercises";
const options = {
	method: "GET",
	headers: {
		"X-RapidAPI-Key": "083914206emsh11d92ddfb433948p11023ajsnd520bb0564e2",
		"X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
	},
};

const Exercise_api={
  
  async exercises_call(limit:number,){
    return fetch(Base_URL+"?limit="+limit, options)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
  },

  async exercise_name(name:string, limit:number){
    return fetch(Base_URL+"/name/"+name+"?/limit="+limit, options)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
  },

  async exercise_id(id_number:number){
    return fetch(Base_URL+"/exercise/"+ id_number, options)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
  }
}

export default Exercise_api;

