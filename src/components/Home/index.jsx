import { Link } from "react-router-dom";
import "./index.css";

const Home = () => {
  return (
    <div className="homeComponent">
      <h1>Weather to Work Out</h1>
      <div className="mainMenu">
        <Link to="/farmer">
          <h2 className="menuItem">Farmer</h2>
        </Link>
        <Link to="/traveller">
          <h2 className="menuItem">Traveller</h2>
        </Link>
        <Link to="/eventplanner">
          <h2 className="menuItem">Event Planner</h2>
        </Link>
      </div>
    </div>
  );
};

export default Home;
