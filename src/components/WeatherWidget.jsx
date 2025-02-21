import React, { useState, useEffect } from 'react';

const WeatherWidget = () => {
    const [weather, setWeather] = useState(null);
    const [locationError, setLocationError] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [city, setCity] = useState("");

    useEffect(() => {
        const fetchWeather = async (lat, lon) => {
            const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

            try {
                const response = await fetch(url);
                const data = await response.json();
                setWeather(data.current_weather);
            } catch (error) {
                console.error("Failed to fetch weather data", error);
                setLocationError(true);
            }
        };

        const fetchCityName = async (lat, lon) => {
            const url = `https://maps.googleapis.com/mapshttp://195.179.231.102:6003/api/geocode/json?latlng=${lat},${lon}&key=AIzaSyCJiE5-F5s--KvBT8QDbvkXXpymdg7vAtk`;

            try {
                const response = await fetch(url);
                const data = await response.json();
                const city = data.results[0].address_components.find(component => component.types.includes("locality")).long_name;
                setCity(city);
            } catch (error) {
                console.error("Failed to fetch city name", error);
                setLocationError(true);
            }
        };

        const getLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const lat = position.coords.latitude;
                        const lon = position.coords.longitude;
                        fetchWeather(lat, lon);
                        fetchCityName(lat, lon);
                    },
                    (error) => {
                        console.error("Error getting location", error);
                        setLocationError(true);
                    }
                );
            } else {
                console.error("Geolocation is not supported by this browser");
                setLocationError(true);
            }
        };

        getLocation();

        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const determineBackground = () => {
        const hour = currentTime.getHours();
        const isDaytime = hour > 6 && hour < 20;
        const weatherCode = weather?.weather_code;

        if (!isDaytime) {
            return 'night';
        }
        switch (weatherCode) {
            case 'clear':
                return 'sunny';
            case 'clouds':
                return 'cloudy';
            default:
                return 'default';
        }
    };

    if (locationError) return <div>Unable to access your location or fetch data.</div>;
    if (!weather) return <div>Loading...</div>;

    const backgroundClass = determineBackground();

    return (
        <div className={`weather-widget ${backgroundClass}`}>
            <div className="weather-top">
                <div className="location">{city}</div>
                <div className="current-temp">{Math.round(weather.temperature)}°</div>
                <div className="condition">{weather.weather_code}</div>
                <div className="current-time">{currentTime.toLocaleTimeString()}</div>
            </div>
        </div>
    );
};

export default WeatherWidget;

// CSS in JS
const css = `
.weather-widget {
    position: fixed;
    width: 300px;
    color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.25);
    font-family: Arial, sans-serif;
    transition: background 0.5s ease-in-out;
    z-index: 10;
    top: 90px;
    left: 20px;
}

.default {
    background: linear-gradient(to bottom, #333, #444);
}

.sunny {
    background: linear-gradient(to bottom, #f9d71c, #f39c12);
}

.cloudy {
    background: linear-gradient(to bottom, #bdc3c7, #2c3e50);
}

.night {
    background: linear-gradient(to bottom, #2c3e50, #000);
}

.weather-top {
    text-align: center;
}

.location, .current-time {
    font-size: 16px;
    opacity: 0.75;
}

.current-temp {
    font-size: 36px;
    font-weight: bold;
    margin: 5px 0;
}

.condition {
    font-size: 18px;
    margin-bottom: 20px;
}

/* Add media query for mobile view */
@media (max-width: 768px) {
    .weather-widget {
        position: static;
        width: 90%;
        margin: 20px auto;
        padding: 10px;
    }

    .current-temp {
        font-size: 28px;
    }

    .condition {
        font-size: 16px;
    }
}

`;

const styleSheet = document.createElement("style");
styleSheet.innerText = css;
document.head.appendChild(styleSheet);
