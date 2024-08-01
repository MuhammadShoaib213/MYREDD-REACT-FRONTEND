import React, { useState, useEffect } from 'react';

const WeatherWidget = () => {
    const [weather, setWeather] = useState(null);
    const [locationError, setLocationError] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const fetchWeather = async () => {
            const lat = '31.5497'; // Latitude for Lahore
            const lon = '74.3436'; // Longitude for Lahore
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

        fetchWeather();

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
                <div className="location">Lahore</div>
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
