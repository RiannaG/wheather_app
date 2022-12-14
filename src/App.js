import { useState } from "react";
import "./App.css";
import Search from "./components/search/Search";
import CurrenWeather from "./components/current-weather/CurrentWheater";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
import { Forecast } from "./components/forecast/Forecast";

function App() {
  const [currentWheater, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWheater && <CurrenWeather data={currentWheater} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
