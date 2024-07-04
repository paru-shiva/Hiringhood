import { useState, useEffect } from "react";
import { format } from "date-fns";
import "./index.css";

const Farmer = () => {
  const [weatherData, modifyWeatherData] = useState({});
  const [fetchStatus, changeFetchStatus] = useState("loading");
  const [place, changePlace] = useState("Hyderabad");
  const [date, changeDate] = useState(format(new Date(), "yyyy-MM-dd"));

  useEffect(() => {
    const baseUrl = `https://api.weatherapi.com/v1/future.json?key=2a4b4962a62b47f5b47162651240407&q=${place}&dt=${date}`;
    const fetchWeatherData = async () => {
      const response = await fetch(baseUrl);
      if (response.ok === true) {
        changeFetchStatus("success");
        modifyWeatherData(await response.json());
      } else {
        changeFetchStatus("failed");
        modifyWeatherData(await response.json());
      }
    };
    fetchWeatherData();
    console.log(place, date);
  }, []);

  const onPlaceChange = (e) => {
    changePlace(e.target.value);
  };

  const onDateChange = (e) => {
    changeDate(e.target.value);
  };

  const onBtnClick = () => {
    console.log(place, date);
  };

  const renderInputElements = () => {
    return (
      <div className="inputsDiv">
        <label className="inputLabel" htmlFor="ipBox">
          Place:
        </label>
        <input
          id="ipBox"
          className="inputBox"
          value={place}
          placeholder="Enter any Place"
          onChange={onPlaceChange}
          type="text"
        />

        <label className="inputLabel" htmlFor="ipDate">
          Date:
        </label>
        <input
          onChange={onDateChange}
          id="ipDate"
          className="inputBox dateBox"
          type="date"
          value={date}
        />

        <button onClick={onBtnClick} type="button" className="forcastBtn">
          Get Forcast
        </button>
      </div>
    );
  };

  return (
    <div className="farmerComponent">
      <h1 className="farmersHeading">Welcome to Farmers Corner </h1>
      {renderInputElements()}
    </div>
  );
};

export default Farmer;
