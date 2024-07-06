import { useState } from "react";
import { useLocation } from "react-router-dom";

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
    if (location.pathname === "/farmer") {
      return (
        <div className="desDiv">
          <img className="desImg" src="../../../images/farmerimage.jpg" />
        </div>
      );
    } else if (location.pathname === "/eventplanner") {
      return (
        <div className="desDiv">
          <img className="desImg" src="../../../images/eventplannerimage.jpg" />
        </div>
      );
    } else if (location.pathname === "/traveller") {
      return (
        <div className="desDiv">
          <img className="desImg" src="../../../images/travellerimage.jpg" />
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
