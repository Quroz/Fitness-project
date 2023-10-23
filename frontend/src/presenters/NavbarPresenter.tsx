import React, { useContext, useEffect, useState } from "react";

import { useAccount } from "../hooks/useAccount";
import NavbarView from "../pages/Navbar/NavbarView";
import AppContext from "../context/app/AppContext";
interface Context {
	workoutData: any;
	setData: () => void;
}
const NavbarPresenter: React.FC = () => {
  const { logout } = useAccount({});
  const [thisPage, setThisPage] = useState("dashboard");
  const context = useContext(AppContext);
  const {
    workoutData,
    setData,
  } = context as Context;
  
  useEffect(() => {
    // Fetch or update workoutData
    if (workoutData.length === 0 ) {
      setData();
    }
  }, []);


  function logoutHandler() {
    logout();
  }

  return (
    <NavbarView
      thisPage={thisPage}
      setThisPage={setThisPage}
      onLogout={logoutHandler}
    />
  );
};

export default NavbarPresenter;
