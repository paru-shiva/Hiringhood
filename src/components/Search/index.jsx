import { useState } from "react";
import { useLocation, Link } from "react-router-dom";

import "./index.css";

const Search = ({ changePlace }) => {
  const [city, changeCity] = useState("Hyderabad");

  const onCityChange = (e) => {
    changeCity(e.target.value);
  };

  const onSearchBtnClick = () => {
    changePlace(city);
  };

  const location = useLocation();

  const renderImage = () => {
    let designation = location.pathname;
    designation = designation.split("");
    designation.splice(0, 1);
    const firstLetter = designation[0].toUpperCase();
    designation.splice(0, 1);
    designation = designation.join("");
    designation = firstLetter.concat(designation);

    if (location.pathname === "/farmer") {
      return (
        <div className="desDiv">
          <img className="desImg" src="../../../images/farmerimage.jpg" />
          <p>Not a {designation}? click here for Homepage</p>
          <Link className="homeLink" to="/">
            Home Page
          </Link>
        </div>
      );
    } else if (location.pathname === "/eventplanner") {
      return (
        <div className="desDiv">
          <img className="desImg" src="../../../images/eventplannerimage.jpg" />
          <p>Not a {designation}? click here for Homepage</p>
          <Link className="homeLink" to="/">
            Home Page
          </Link>
        </div>
      );
    } else if (location.pathname === "/traveller") {
      return (
        <div className="desDiv">
          <img className="desImg" src="../../../images/travellerimage.jpg" />
          <p>Not a {designation}? click here for Homepage</p>
          <Link className="homeLink" to="/">
            Home Page
          </Link>
        </div>
      );
    }
  };

  return (
    <div className="searchComponent">
      <h2 className="searchHeading">Set Your City Here 👇</h2>
      <input
        value={city}
        onChange={onCityChange}
        className="cityInput"
        type="text"
        placeholder="City Name"
      />
      <button onClick={onSearchBtnClick} className="forcastBtn">
        Get Forcast
      </button>
      <div>{renderImage()}</div>
    </div>
  );
};

export default Search;
