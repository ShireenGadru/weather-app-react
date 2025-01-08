import { useEffect, useState } from "react";
import "./App.css";
import { Weather } from "./types/weather.types";

const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function App() {
  const [data, setData] = useState<Weather>();
  const [error, setError] = useState<string>("");
  const [location, setLocation] = useState<string>();

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${
          location ?? "Paris"
        }&aqi=no`
      );
      const data = await response.json();
      setData(data);
      setError("");
    } catch (error: any) {
      setError(error?.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!location) {
      setError("Please enter a location");
    } else {
      fetchData();
    }
  };

  return (
    <div className="container">
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Location..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="search"
        />
        <button className="submit-btn">Submit</button>
        {error && <div className="error">{error}</div>}
      </form>
      <div className="weather-data">
        <div className="name">
          {`${data?.location?.name}, ${data?.location?.country}`}{" "}
        </div>

        <div className="basic-info">
          <div className="description">
            <img
              src={data?.current?.condition?.icon}
              alt={data?.current?.condition?.text}
              className="icon"
            />
          </div>

          <div className="temp">{Math.round(data?.current?.temp_c || 0)}°C</div>
        </div>
        <div className="condition">{data?.current?.condition?.text}</div>
        <div className="feel">
          Feels like {Math.round(data?.current?.feelslike_c || 0)}°C
        </div>

        <div className="humidity">Humidity: {data?.current?.humidity}</div>
      </div>
    </div>
  );
}

export default App;
