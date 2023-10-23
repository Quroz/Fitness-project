import React from 'react';
import Exercise from '../interfaces/Exercise';
const Base_URL = "https://exercisedb.p.rapidapi.com/exercises";
const headers = {
	"X-RapidAPI-Key": "8a354e8a27msh1bad040c9cceae5p1e730fjsn03fd27ba67a5",
	"X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
};
export const APIController = (function () {


  async function exercises_call(limit: number): Promise<Exercise[]> {
    try {
      const response = await fetch(`${Base_URL}?limit=${limit}`, {
        method: "GET",
        headers,
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching exercises:", error);
      return [];
    }
  }

  async function exercise_name(name: string, limit: number): Promise<Exercise[]> {
    try {
      const response = await fetch(
        `${Base_URL}/name/${name.toLowerCase()}?limit=${limit}`,
        {
          method: "GET",
          headers,
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching exercises by name:", error);
      return [];
    }
  }

  async function exercise_id(id_number: number): Promise<Exercise[]> {
    try {
      const response = await fetch(`${Base_URL}/exercise/${id_number}`, {
        method: "GET",
        headers,
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching exercises by ID:", error);
      return [];
    }
  }

  async function exercise_part(bodyPart: string, limit: number): Promise<Exercise[]> {
    const url = `https://${headers["X-RapidAPI-Host"]}/exercises/bodyPart/${encodeURIComponent(
      bodyPart
    )}?limit=${limit}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers,
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error fetching exercises by body part:", error);
      return [];
    }
  }

  return {
    exercises_call,
    exercise_name,
    exercise_id,
    exercise_part,
  };
})();
