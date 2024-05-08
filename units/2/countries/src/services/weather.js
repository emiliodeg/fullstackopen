import axios from "axios";

const url = "https://api.openweathermap.org/data/2.5/weather";

const getByCity = (city) => {
  const params = new URLSearchParams({ q: city, units: "metric", appid: import.meta.env.VITE_WEATHER_KEY });

  return axios.get(`${url}?${params}`).then(({ data }) => data);
};

export default { getByCity };
