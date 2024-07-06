import { Link } from "react-router-dom";
import "./index.css";

const Home = () => {
  return (
    <div className="homeComponent">
      <h2 className="greeting">🌧️☀️☁️🌤️❄️⛅🌩️🌥️</h2>
      <h1 className="heading"> Weather to Work Out ? </h1>
      <h3 className="ima">I'm</h3>
      <div className="mainMenu">
        <Link to="/farmer">
          <div className="menuItem">
            <img className="menuImg" src="../../../images/farmer.jpg" />
            <p className="des">Farmer</p>
          </div>
        </Link>
        <Link to="/traveller">
          <div className="menuItem">
            <img className="menuImg" src="../../../images/traveller.jpg" />
            <p className="des">Traveller</p>
          </div>
        </Link>
        <Link to="/eventplanner">
          <div className="menuItem">
            <img className="menuImg" src="../../../images/event.jpg" />
            <p className="des">Planning an Event</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
