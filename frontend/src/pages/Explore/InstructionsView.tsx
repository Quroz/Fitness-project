import React from 'react'
import Exercise from '../../interfaces/Exercise';
import { useLocation, useNavigate } from "react-router-dom";



// The function takes in an exercise 

function InstructionsPage() : JSX.Element {
  
  const location = useLocation();
  const searchData = new URLSearchParams(location.search).get('data');

  const dataJSON = searchData ? JSON.parse(decodeURIComponent(searchData)) : null;


  return (
		<div>
			Instructions Page
			<div>
				<h1> {dataJSON.exercise.name}</h1>
        <h2> {dataJSON.exercise.bodyPart}</h2>
        <h2> {dataJSON.exercise.equipment}</h2>
        <h2> {dataJSON.exercise.target}</h2>
        <h2> {dataJSON.exercise.secondaryMuscles}</h2>
        <h2> {dataJSON.exercise.instructions}</h2>
        <h2> {dataJSON.exercise.gifUrl}</h2>
        
                  
  
			</div>
		</div>
	);
}

export default InstructionsPage;