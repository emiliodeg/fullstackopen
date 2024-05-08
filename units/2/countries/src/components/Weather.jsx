import { useState, useEffect } from "react";
import weatherSrv from "../services/weather";

export default function Weather({ city }) {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    weatherSrv.getByCity(city).then((data) => setWeather(data));
  }, [city]);

  if (!weather) return <p>Loading...</p>;

  const styles = { transform: `rotate(${weather.wind.deg}deg)`, display: "inline-block" };

  return (
    <>
      <h2>Weather in {city}</h2>
      <p>
        temperature {weather.main.temp} Celsius, but feels like {weather.main.feels_like}
      </p>
      <figure>
        <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
        <figcaption>{weather.weather[0].description}</figcaption>
      </figure>
      <p>
        wind {weather.wind.speed} m/s{" "}
        <span style={styles} title={`${weather.wind.deg} degrees`}>
          🡩
        </span>
      </p>
    </>
  );
}
