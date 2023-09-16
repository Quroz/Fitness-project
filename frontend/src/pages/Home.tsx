import React from 'react'
import WorkoutPlan from "./WorkoutPlan"

type Props = {}

function Home({}: Props) {
  return (
    <div className="flex">
        <div className="h-screen w-48 bg-red-500"/>
        <div className="flex-1">
            <WorkoutPlan/>
        </div>
    </div>
  )
}

export default Home