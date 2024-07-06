import { useState, useEffect } from "react";
import { format } from "date-fns";
import "./index.css";

const WeatherStats = () => {
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
    const chanceOfRain =
      weatherData.forecast.forecastday[0].day.daily_chance_of_rain;

    const {
      temp_c,
      temp_f,
      humidity,
      wind_kph,
      cloud,
      wind_dir,
      last_updated,
    } = currentData;
    const currentImage = currentData.condition.icon;
    const condition = currentData.condition.text;
    return (
      <div className="firstCard">
        <h2 className="todaysWeatherHeading">:: Current Weather ::</h2>
        <div className="actualWeather">
          <p className="infoParas">{`Temp ${temp_c} °C / ${temp_f} °F`}</p>
          <img className="currentTempIcon" src={currentImage} />
        </div>
        <p className="infoParas">{`Clouds ${cloud}%`}</p>
        <p className="infoParas">Weather Condition {condition}</p>
        <p className="infoParas">Humidity {humidity}</p>
        <p className="infoParas">{`Wind ${wind_kph} kph (${wind_dir})`}</p>
        <p className="infoParas">{`Chance of Rain Today ${chanceOfRain}%`}</p>
        <p className="infoParas update">{`Last Updated ${last_updated}`}</p>
      </div>
    );
  }
};

export default WeatherStats;
