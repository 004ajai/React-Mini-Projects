import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import "./Weather.css";

const API_KEY = "223726cc1ffc6db2bd88505d1f3ba313";

const iconMap = {
  Clear: { icon: "ph:sun-fill", color: "#FDB813" },
  Clouds: { icon: "ph:cloud-fill", color: "#94A3B8" },
  Rain: { icon: "ph:cloud-rain-fill", color: "#60A5FA" },
  Drizzle: { icon: "ph:cloud-drizzle-fill", color: "#60A5FA" },
  Thunderstorm: { icon: "ph:lightning-fill", color: "#FBBF24" },
  Snow: { icon: "ph:snowflake", color: "#E0F2FE" },
  Mist: { icon: "ph:cloud-fog-fill", color: "#94A3B8" },
};

const Weather = () => {
  const [activeTab, setActiveTab] = useState("weather");
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("London");
  const [current, setCurrent] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getIcon = (type, size = 32) => {
    const { icon, color } = iconMap[type] || iconMap.Clear;
    return <Icon icon={icon} style={{ fontSize: size, color }} />;
  };

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();
      if (data.cod === 200) {
        setCurrent(data);
        fetchForecast(cityName);
      } else {
        setCurrent(null);
        setForecast([]);
        setError(true);
      }
    } catch (err) {
      console.error("Error fetching weather:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchForecast = async (cityName) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();
      console.log(data)
      if (data.cod === "200") {
        setForecast(data.list);
      } else {
        setForecast([]);
      }
    } catch (err) {
      console.error("Error fetching forecast:", err);
      setForecast([]);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  const handleSearch = (e) => {
    if (e.key === "Enter" && search.trim()) {
      setCity(search.trim());
      setSearch("");
    }
  };

  if (loading) {
    return (
      <div className="app">
        <div className="loading">Loading weather data...</div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="container">
        {/* Tabs */}
        <div className="tabs">
          {["weather", "cities"].map((tab) => (
            <button
              key={tab}
              className={`tab ${activeTab === tab ? "tab-active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              <Icon
                icon={tab === "weather" ? iconMap.Clear.icon : "ph:list"}
                className="tab-icon"
              />
              {tab === "weather" ? "Weather" : "Cities"}
            </button>
          ))}
        </div>

        {activeTab === "weather" ? (
          <main className="main">
            {/* Search */}
            <input
              type="text"
              placeholder="Search city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearch}
              className="search-input"
            />

            {error ? (
              <div className="error-ui">
                <Icon
                  icon="ph:warning-circle"
                  style={{ fontSize: 50, color: "#EF4444" }}
                />
                <h2>City not found!</h2>
                <p>Please check the city name and try again.</p>
              </div>
            ) : (
              <div className="content-grid">
                <div className="left-section">
                  <div className="current-weather">
                    <div>
                      <h1 className="city-name">
                        {current.name}, {current.sys.country}
                      </h1>
                      <p className="sub-text">
                        {current.weather[0].description.toUpperCase()}
                      </p>
                    </div>
                    <div className="temp-display">
                      <div className="temp-value">
                        {Math.round(current.main.temp)}°
                      </div>
                      {getIcon(current.weather[0].main, 60)}
                    </div>
                  </div>

                  <div className="card">
                    <h3 className="card-title">TODAY'S FORECAST</h3>
                    <div className="hourly-grid">
                      {forecast.filter((f) =>new Date(f.dt_txt).getDate() ===new Date().getDate()
                        ).slice(0, 6).map((f, i) => (
                          <div key={i} className="hourly-item">
                            <div>
                              {new Date(f.dt_txt).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </div>
                            {getIcon(f.weather[0].main, 40)}
                            <div>{Math.round(f.main.temp)}°</div>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-header">
                      <h3 className="card-title">AIR CONDITIONS</h3>
                    </div>
                    <div className="conditions-grid">
                      <div className="condition-item">
                        <div className="condition-header">
                          <Icon
                            icon="ph:thermometer"
                            className="condition-icon"
                          />
                          <span>Real Feel</span>
                        </div>
                        <div className="condition-value">
                          {Math.round(current.main.feels_like)}°
                        </div>
                      </div>
                      <div className="condition-item">
                        <div className="condition-header">
                          <Icon icon="ph:wind" className="condition-icon" />
                          <span>Wind</span>
                        </div>
                        <div className="condition-value">
                          {current.wind.speed} m/s
                        </div>
                      </div>
                      <div className="condition-item">
                        <div className="condition-header">
                          <Icon icon="ph:drop" className="condition-icon" />
                          <span>Humidity</span>
                        </div>
                        <div className="condition-value">
                          {current.main.humidity}%
                        </div>
                      </div>
                      <div className="condition-item">
                        <div className="condition-header">
                          <Icon
                            icon="ph:sun-horizon"
                            className="condition-icon"
                          />
                          <span>Pressure</span>
                        </div>
                        <div className="condition-value">
                          {current.main.pressure} hPa
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Section */}
                <div className="week-forecast">
                  <h3 className="card-title">NEXT 5 DAYS FORECAST</h3>
                  <div className="week-list">
                    {forecast
                      .filter((_, i) => i % 8 === 0)
                      .slice(0, 7)
                      .map((f, i) => (
                        <div key={i} className="day-item">
                          <div>
                            {new Date(f.dt_txt).toLocaleDateString("en-US", {
                              weekday: "short",
                            })}
                          </div>
                          {getIcon(f.weather[0].main, 32)}
                          <div>{f.weather[0].main}</div>
                          <div>
                            {Math.round(f.main.temp_max)}° /{" "}
                            {Math.round(f.main.temp_min)}°
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </main>
        ) : (
          <main>
            <h2 className="cities-title">Saved Cities</h2>
            <p className="info-text">Dynamic city search coming soon...</p>
          </main>
        )}
      </div>
    </div>
  );
};

export default Weather;