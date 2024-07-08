import { Link } from "react-router-dom";
import "./index.css";

const Home = () => {
  return (
    <div className="homeComponent">
      <h2 className="greeting">🌧️☀️☁️🌤️❄️⛅🌩️🌥️</h2>
      <h1 className="heading"> Weather to Work Out ? </h1>
      <h3 className="ima">I'm</h3>

      <div className="mainMenu">
        
        <div className="menuItem"> 
        <Link to="/farmer">          
            <img className="menuImg" src="../../../images/farmer.jpg" />
            <p className="des">Farmer</p>          
        </Link></div>
        
        <div className="menuItem">
        <Link to="/traveller">          
            <img className="menuImg" src="../../../images/traveller.jpg" />
            <p className="des">Traveller</p>          
        </Link></div>
        
        <div className="menuItem">
        <Link to="/eventplanner">          
            <img className="menuImg" src="../../../images/event.jpg" />
            <p className="des">Planning an Event</p>          
        </Link></div>

      </div>
    </div>
  );
};

export default Home;
