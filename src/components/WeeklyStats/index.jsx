import { useState, useEffect } from "react";
import { format } from "date-fns";
import "./index.css";
import WeeklyCard from "../WeeklyCard";

const WeeklyStats = ({ place }) => {
  const [weatherData, modifyWeatherData] = useState([]);
  const [fetchStatus, changeFetchStatus] = useState("loading");
  const [date, changeDate] = useState(format(new Date(), "yyyy-MM-dd"));

  useEffect(() => {
    changeFetchStatus("loading");
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
  }, [place]);

  const currentData = weatherData.current;

  const renderData = () => {
    switch (fetchStatus) {
      case "loading":
        return <p>Loading...</p>;
        break;

      case "success":
        if (currentData !== undefined) {
          let dataReceived = weatherData.forecast.forecastday;
          dataReceived = dataReceived.slice(0,7)
          return (
            <div className="main-div">
            <div className="weeklyCards">
              {dataReceived.map((eachItem) => {
                return <WeeklyCard key={eachItem.date} data={eachItem} />;
              })}
            </div>
            </div>
          );
        }
        break;

      case "failed":
        return (
          <div style={{ textAlign: "center", backgroundColor: "#364f6b" }}>
            <p>City Data is Not Availale!</p>
            <p>Input Valid City Name</p>
            <p>Try Reloading..</p>
          </div>
        );
        break;

      default:
        break;
    }
  };

  return renderData();
};

export default WeeklyStats;
