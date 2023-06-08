import { useState, useEffect } from "react";

function App() {
  const [term, setTerm] = useState("");
  const [city, setCity] = useState("San Jose");
  const [cityDetails, setCityDetails] = useState([]);
  const [data, setdata] = useState(false);

  const [weather, setWeather] = useState([]);

  const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${city}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": import.meta.env.VITE_RapidAPI_Key,
      "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
    },
  };
  const search = async () => {
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setCityDetails(data.location);
      setWeather(data.current);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    search();
  }, [city]);

  const handleChange = (e) => {
    e.preventDefault();
    setTerm(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setCity(term);
      setdata(true);
    }
  };

  return (
    <div className="app flex">
      <input
        type="text"
        placeholder="Search City... "
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {data ? (
        <div className="app-container flex">
          <div className="city-container flex">
            <h1>{cityDetails.name}</h1>
            <h3>{cityDetails.country}</h3>
            <h3>{cityDetails.localtime}</h3>
          </div>

          <div className="weather-container flex">
            <h2>{weather.temp_f}°F</h2>
            <img src={weather.condition.icon} />
            <span>{weather.condition.text}</span>
            <div className="details">
              <section>
                <span>Wind</span>
                <p>{weather.wind_mph} mph</p>
                <img
                  // src="/wind.png"
                  src="./wind.png"
                  alt="https://www.flaticon.com/free-icons/wind"
                  title="wind icons"
                />
              </section>
              <section>
                <span>Humidity</span>
                <p>{weather.humidity}%</p>
                <img
                  // src="/humidity.png"
                  src="./humidity.png"
                  alt="https://www.flaticon.com/free-icons/humidity"
                  title="humidity icons"
                />
              </section>
              <section>
                <span>Rain</span>
                <p>{weather.precip_mm} mm</p>
                <img
                  // src="/rainy.png"
                  src="./rainy.png"
                  alt="https://www.flaticon.com/free-icons/rain"
                  title="rain icons"
                />
              </section>
              <section>
                <span>UV Index</span>
                <p>{weather.uv}</p>
                <img
                  // src="/uv-index.png"
                  src="./uv-index.png"
                  alt="https://www.flaticon.com/free-icons/uv-index"
                  title="uv index icons"
                />
              </section>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
