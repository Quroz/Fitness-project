import React from 'react'
import Workout from './Workout';

type Props = {}

function Home({}: Props) {
  return (
		<div className="flex">
			<div className="w-48 h-screen bg-red-500" />
			<div className="flex-1">
				<Workout />
			</div>
		</div>
	);
}

export default Home