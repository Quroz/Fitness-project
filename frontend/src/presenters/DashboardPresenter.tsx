import { useEffect, useState, useContext } from "react";
import CompWorkouts from "../interfaces/CompWorkouts";
import DashboardView from "../pages/Dashboard/Dashboard";
import AppContext from "../context/app/AppContext";
import { useNavigate } from "react-router-dom";

interface Context {
  workoutData: any;
  completedWorkouts: any;
  dashboardData: any;
  user: any;
  setData: () => void;
  setUser: () => void;
  setCompleted: () => void;
  setDashboardData: () => void;
}
function DashboardPresenter() {
  const [isAnimating, setIsAnimating] = useState(false);
  const innerWidth = window.innerWidth;
  const navigate = useNavigate();

  const context = useContext(AppContext);
  const {
    completedWorkouts,
    dashboardData,
  } = context as Context;




  useEffect(() => {
    // Trigger the animation after a delay or some event.
    setTimeout(() => {
      setIsAnimating(true);
    }, 500); // Delay of 1 second
  }, []);

  function navigateHandler(){
    navigate("/workoutPlan")
  }

  return (
    (dashboardData.favouriteWorkout !== "")  &&    <DashboardView
    workouts={completedWorkouts}
    favWorkout={dashboardData.favouriteWorkout}
    barData={dashboardData.barData}
    isAnimating={isAnimating}
    innerWidth={innerWidth}
    navigateHandler = {navigateHandler}
  />

  );
}

export default DashboardPresenter;
