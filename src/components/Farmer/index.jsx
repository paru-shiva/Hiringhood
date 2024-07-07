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
      }
    };
    fetchWeatherData();
  }, [place]);

  const onChangePlace = (ip) => {
    changePlace(ip);
  };

  const renderInstructionsCard = () => {
    if (weatherData.length !== 0) {
      const { avgtemp_c, daily_chance_of_rain, avghumidity, maxwind_mph } =
        weatherData.forecast.forecastday[0].day;
      const { sunrise } = weatherData.forecast.forecastday[0].astro;

      switch (fetchStatus) {
        case "loading":
          return <p>Loading..</p>;
          break;

        case "success":
          return (
            <div className="instructionsCard">
              <h2 className="secHeading">Hello Dear Farmer</h2>
              <h2>
                <u>** Instructions Customized For You **</u>
              </h2>

              <ul>
                <li>
                  {avgtemp_c < 32 ? (
                    <p>
                      The Temparature is not very High. May support Germination
                      Stage of Farming. (Needs little Watering)
                    </p>
                  ) : (
                    <p>
                      The Temparature is a bit High. Your Farm may need regular
                      Watering.
                    </p>
                  )}
                </li>
                <li>
                  {avghumidity > 70 ? (
                    <p>
                      This is an ideal Moisture in atmosphere/soil supports
                      Germination & Growth phases.
                    </p>
                  ) : (
                    <p>
                      Current Moisture level in the air/soil supports Growth and
                      Flowering phases of plants. (not ideal for Germination)
                    </p>
                  )}
                </li>
                <li>
                  {maxwind_mph > 40 ? (
                    <p>
                      The Wind Speed is a bit High Today. Please take necessary
                      action befor it damages.
                    </p>
                  ) : (
                    <p>
                      The Speed of Wind seems Normal Today. No precautionary
                      action is Necessary.
                    </p>
                  )}
                </li>
                <li>
                  {daily_chance_of_rain > 50 ? (
                    <p>
                      Hey! It may Rain Today! No need to water the farm. If
                      Needed please take precautionary action to save your
                      sensitive farm.
                    </p>
                  ) : (
                    <p>It May Not rain today! Remember to water the farm.</p>
                  )}
                </li>
              </ul>
            </div>
          );
          break;
        case "failed":
          return (
            <div
              style={{
                backgroundColor: "darkblue",
                color: "white",
                padding: "15px",
              }}
            >
              <p>Ciy Data Not Available</p> <p>Enter Valid City</p>
              <p>Try Reloading</p>
            </div>
          );
          break;

        default:
          return (
            <div
              style={{
                backgroundColor: "darkblue",
                color: "white",
                padding: "15px",
              }}
            >
              <p>Ciy Data Not Available</p> <p>Enter Valid City</p>
              <p>Try Reloading</p>
            </div>
          );
          break;
      }
    }
  };

  return (
    <div className="farmerComponent">
      <div className="todaysInfo">
        <WeatherStats place={place} />
        {renderInstructionsCard()}
        <Search changePlace={onChangePlace} />
      </div>
      <div className="weeklyInfo">
        <WeeklyStats place={place} />
      </div>
    </div>
  );
};

export default Farmer;
