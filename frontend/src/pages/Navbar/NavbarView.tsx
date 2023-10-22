import DashboardIcon from "../../assets/Navbar/dashboard.png";
import WorkoutPlanIcon from "../../assets/Navbar/workout.png";
import ExploreIcon from "../../assets/Navbar/explore.png";
import SettingsIcon from "../../assets/Navbar/settings.png";
import LogoutIcon from "../../assets/Navbar/logout.png";
import { Link } from "react-router-dom";

interface INavbarViewProps {
  thisPage: string;
  setThisPage: (page: string) => void;
  onLogout: () => void;
}

function NavbarView({ thisPage, setThisPage, onLogout }: INavbarViewProps) {
  return (
    <div className="z-50 fixed flex flex-col h-screen w-16 bg-white px-2">
      <nav className="flex flex-col justify-between object-center h-screen my-10 mt-20">
        <div className="flex flex-col space-y-4">
          <div
            className={`${
              thisPage === "dashboard" ? "bg-green-100" : "bg-transparent"
            } transform transition-transform hover:scale-110`}
            onClick={() => setThisPage("dashboard")}
          >
            <Link to="/dashboard">
              <img src={DashboardIcon} alt="Dashboard Icon" />
            </Link>
          </div>
          <div
            className={`${
              thisPage === "workoutplan" ? "bg-green-100" : "bg-transparent"
            } transform transition-transform hover:scale-110`}
            onClick={() => setThisPage("workoutplan")}
          >
            <Link to="/workoutplan">
              <img src={WorkoutPlanIcon} alt="Workout Plan Icon" className="my-2" />
            </Link>
          </div>
          <div
            className={`${
              thisPage === "explore" ? "bg-green-100" : "bg-transparent"
            } transform transition-transform hover:scale-110`}
            onClick={() => setThisPage("explore")}
          >
            <Link to="/explore">
              <img src={ExploreIcon} alt="Explore Icon" className="my-2" />
            </Link>
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <div onClick={onLogout} className="cursor-pointer hover:scale-105">
            <div>
              <img src={LogoutIcon} alt="Logout Icon" />
            </div>
          </div>
          <div
            className={`${
              thisPage === "settings" ? "bg-green-100" : "bg-transparent"
            } transform transition-transform hover:scale-110`}
            onClick={() => setThisPage("settings")}
          >
            <Link to="/settings">
              <img src={SettingsIcon} alt="Settings Icon" />
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavbarView;
