import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAccount } from "../hooks/useAccount";
import NavbarView from "../pages/Navbar/NavbarView";

const NavbarPresenter: React.FC = () => {
  const { logout } = useAccount({});
  const [thisPage, setThisPage] = useState("dashboard");

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
