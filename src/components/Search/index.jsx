import { useState } from "react";
import "./index.css";

const Search = ({ changePlace }) => {
  const [city, changeCity] = useState("Hyderabad");

  const onCityChange = (e) => {
    changeCity(e.target.value);
  };

  const onSearchBtnClick = () => {
    changePlace(city);
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
    </div>
  );
};

export default Search;
