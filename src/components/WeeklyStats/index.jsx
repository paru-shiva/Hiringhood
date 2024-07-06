import { useState, useEffect } from "react";
import { format } from "date-fns";
import "./index.css";
import WeeklyCard from "../WeeklyCard";

const WeeklyStats = () => {
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

  const currentData = weatherData.current;

  if (currentData !== undefined) {
    const dataReceived = weatherData.forecast.forecastday;
    return (
      <div className="weeklyCards">
        {dataReceived.map((eachItem) => {
          return <WeeklyCard key={eachItem.date} data={eachItem} />;
        })}
      </div>
    );
  }
};

export default WeeklyStats;
