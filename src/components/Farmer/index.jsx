import { useState, useEffect } from "react";
import { format } from "date-fns";
import { PieChart, Pie } from "recharts";
import "./index.css";
import WeatherCard from "../WeatherCard";

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

  const onPlaceChange = (e) => {
    changePlace(e.target.value);
  };

  const onDateChange = (e) => {
    changeDate(e.target.value);
  };

  const onBtnClick = () => {
    console.log(place, date);
  };

  const renderCharts = () => {
    if (weatherData.length !== 0) {
      const daily_chance_of_rain =
        weatherData.forecast.forecastday[0].day.daily_chance_of_rain;
      const avghumidity = weatherData.forecast.forecastday[0].day.avghumidity;
      const avgtemp_c = weatherData.forecast.forecastday[0].day.avgtemp_c;
      const avgtemp_f = weatherData.forecast.forecastday[0].day.avgtemp_f;

      const data = [
        { name: "Rainfall", value: daily_chance_of_rain },
        { name: "No Rainfall", value: 100 - daily_chance_of_rain },
      ];

      return (
        <div className="pieAndData">
          <div className="tempAndHumidity">
            <p className="tempdata humidity">{`Humidity: ${avghumidity}`}</p>
            <div className="temps">
              <p className="tempdata">{`Average Temp in °F: ${avgtemp_f}`}</p>
              <p className="tempdata">{`Average Temp in °C: ${avgtemp_c}`}</p>
            </div>
          </div>
          <div className="piechart">
            <PieChart width={400} height={205}>
              <Pie
                dataKey="value"
                startAngle={180}
                endAngle={0}
                data={data}
                cx={200}
                cy={200}
                outerRadius={80}
                fill="#8884d8"
                label
              />
            </PieChart>
            <p>{`Chance of Rainfall is ${daily_chance_of_rain}%`}</p>
          </div>
        </div>
      );
    }
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

  const renderWeatherCards = () => {
    if (weatherData.length !== 0) {
      const dataToRender = weatherData.forecast.forecastday[0];
      return (
        <div className="weatherCardsDiv">
          <WeatherCard data={dataToRender} />
        </div>
      );
    }
  };

  return (
    <div className="farmerComponent">
      <h1 className="farmersHeading">The Farmers Corner </h1>
      {renderInputElements()}
      {renderCharts()}
      {renderWeatherCards()}
    </div>
  );
};

export default Farmer;
