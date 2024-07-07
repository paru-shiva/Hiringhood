import { useState, useEffect } from "react";
import { format } from "date-fns";
import "./index.css";
import WeatherStats from "../WeatherStats";
import WeeklyStats from "../WeeklyStats";
import Search from "../Search";

const EventPlanner = () => {
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
      const { avgtemp_c, daily_chance_of_rain, avghumidity, maxwind_kph } =
        weatherData.forecast.forecastday[0].day;
      const { sunrise } = weatherData.forecast.forecastday[0].astro;

      switch (fetchStatus) {
        case "loading":
          return <p>Loading..</p>;
          break;

        case "success":
          return (
            <div className="instructionsCard">
              <h2 className="secHeading">Hello Dear EventPlanner</h2>
              <h2>
                <u>** Instructions Customized For You **</u>
              </h2>

              <ul>
                <li>
                  {daily_chance_of_rain > 50 ? (
                    <p>
                      It seems it rains Today! Better if you can plan/go to the
                      event some other day.
                    </p>
                  ) : (
                    <p>
                      It seems it may not rain today. You may expect many guests
                      to come to the event.
                    </p>
                  )}
                </li>
                <li>
                  {maxwind_kph > 40 ? (
                    <p>
                      The wind speed today is a bit High! Better to plan/go to
                      indoor events.
                    </p>
                  ) : (
                    <p>
                      The Wind speed seems to be normal today. You may
                      arrange/attend outdoor events.
                    </p>
                  )}
                </li>
                <li>
                  {avgtemp_c > 32 ? (
                    <p>
                      The Temparature is going to be a bit High today. Remember
                      to carry things to make you feel cool Today!
                    </p>
                  ) : (
                    <p>
                      The Tempature seems to be little low today. Make necessary
                      arrangements if you feel cold.
                    </p>
                  )}
                </li>
                <li>
                  <p>
                    Please check Atmospheric Stats of other places to find the
                    best location to plan/go to the events.
                  </p>
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
          break;
      }
    }
  };

  return (
    <div className="eventplannerComponent">
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

export default EventPlanner;
