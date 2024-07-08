import { useState, useEffect } from "react";
import { format } from "date-fns";
import "./index.css";
import WeatherStats from "../WeatherStats";
import WeeklyStats from "../WeeklyStats";
import Search from "../Search";

const Traveller = () => {
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
              <h2 className="secHeading">Hello Dear Traveller</h2>
              <h2 className="custInst">
                <u>** Instructions Customized For You **</u>
              </h2>

              <ul>
                <li>
                  {avgtemp_c > 32 ? (
                    <p>
                      The Temparature is a bit High today! Please take things
                      along to make yourself Coool.
                    </p>
                  ) : (
                    <p>
                      The Temparature is not very High. Take things along to
                      make you feel warm during your journey.
                    </p>
                  )}
                </li>
                <li>
                  {daily_chance_of_rain > 50 ? (
                    <p>
                      It seems it rains Today! Wear a Raincoat while you travel
                      outside.
                    </p>
                  ) : (
                    <p>
                      It may not rain today. May weather support you during your
                      journey.
                    </p>
                  )}
                </li>
                <li>
                  {avghumidity > 80 ? (
                    <p>
                      The Visibility is a bit less due to Humidity in
                      atmosphere. You may miss to capture some interesting
                      snaps.
                    </p>
                  ) : (
                    <p>
                      The Visibility seems to be normal today less Humidity in
                      atmosphere. You may capture some interesting snaps.
                    </p>
                  )}
                </li>
                <li>
                  <p>
                    You may see explore the atmospheric stats of other citis &
                    plan your travel journey.
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
      <div className="presentInfo">
        <div className="weather-stats">
          <WeatherStats place={place} />
        </div>
        <div className="instructions-card">{renderInstructionsCard()}</div>
      </div>

      <div className="weeklyInfo">
        <WeeklyStats place={place} />
      </div>

      <div className="searchCom">
        <Search changePlace={onChangePlace} />
      </div>
    </div>
  );
};

export default Traveller;
