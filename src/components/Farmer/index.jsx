import { useState, useEffect } from "react";
import { format } from "date-fns";
import "./index.css";
import WeatherStats from "../WeatherStats";
import WeeklyStats from "../WeeklyStats";
import Search from "../Search";

const Farmer = () => {
  const [weatherData, modifyWeatherData] = useState([]);
  const [fetchStatus, changeFetchStatus] = useState("loading");
  const [place, changePlace] = useState("Hyderabad");

  const onChangePlace = (ip) => {
    changePlace(ip);
  };

  return (
    <div className="farmerComponent">
      <div className="todaysInfo">
        <WeatherStats place={place} />
        <div className="instructionsCard">
          <h2>
            <u>** Instructions Customized For You **</u>
          </h2>

          <ul>
            <li>
              <p>This is point one</p>
            </li>
            <li>
              <p>This is point one</p>
            </li>
            <li>
              <p>This is point one</p>
            </li>
          </ul>
        </div>
        <Search changePlace={onChangePlace} />
      </div>
      <div className="weeklyInfo">
        <WeeklyStats place={place} />
      </div>
    </div>
  );
};

export default Farmer;
