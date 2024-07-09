import { useState, useEffect } from "react";
import { format } from "date-fns";
import "./index.css";

const WeatherStats = ({ place }) => {
  const [weatherData, modifyWeatherData] = useState([]);
  const [fetchStatus, changeFetchStatus] = useState("loading");

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

  switch (fetchStatus) {
    case "loading":
      return <p>Loading</p>;
      break;
    case "success":
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
            <p className="infoParass">{place}</p>
            <div className="actualWeatherr">
              <p className="infoParass">{`Temp ${temp_c} °C / ${temp_f} °F`}</p>
              <img className="currentTempIcon" src={currentImage} />
            </div>
            <p className="infoParass">{`Clouds ${cloud}%`}</p>
            <p className="infoParass conditionTitle">Weather Condition</p>
            <p className="infoParass conditon">{condition}</p>
            <p className="infoParass">Humidity {humidity}</p>
            <p className="infoParass">{`Wind ${wind_kph} kph (${wind_dir})`}</p>
            <p className="infoParass">{`Chance of Rain Today ${chanceOfRain}%`}</p>
            <p className="infoParass update">{`Last Updated ${last_updated}`}</p>
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

export default WeatherStats;
