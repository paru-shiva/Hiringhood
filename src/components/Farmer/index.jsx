import { useState, useEffect } from "react";
import { format } from "date-fns";
import "./index.css";
import WeatherStats from "../WeatherStats";
import WeeklyStats from "../WeeklyStats";

const Farmer = () => {
  const [weatherData, modifyWeatherData] = useState([]);
  const [fetchStatus, changeFetchStatus] = useState("loading");
  const [place, changePlace] = useState("Hyderabad");
  const [date, changeDate] = useState(format(new Date(), "yyyy-MM-dd"));

  useEffect(() => {
    const baseUrl = `https://api.weatherapi.com/v1/forecast.json?key=2a4b4962a62b47f5b47162651240407&q=${place}&days=10&aqi=yes&alerts=yes`;
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
  }, []);

  return (
    <div className="farmerComponent">
      <div className="todaysInfo">
        <WeatherStats />
        <div className="secondCard">card 2 content</div>
        <div className="thirdCard">card 3 content</div>
      </div>
      <div className="weeklyInfo">
        <WeeklyStats />
      </div>
    </div>
  );
};

export default Farmer;
