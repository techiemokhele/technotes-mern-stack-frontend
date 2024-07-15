import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { WiDaySunny, WiNightClear, WiCloud, WiRain } from 'react-icons/wi';
import { dashboardPromo } from '../../data/imagesData';

const DashboardBannerComponent = () => {
    const [greeting, setGreeting] = useState('');
    const [weather, setWeather] = useState(null);
    const [weatherIcon, setWeatherIcon] = useState(null);
    const [today, setToday] = useState('');

    const getGreeting = useCallback(() => {
        const date = new Date();
        const hours = date.getHours();
        if (hours < 12) {
            setGreeting('Good Morning');
        } else if (hours < 18) {
            setGreeting('Good Afternoon');
        } else {
            setGreeting('Good Evening');
        }
        setToday(new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'short' }).format(date));
    }, []);

    const getWeather = useCallback(async () => {
        try {
            const response = await axios.get('https://weather-api99.p.rapidapi.com/weather', {
                params: { city: 'Springs, Gauteng' },
                headers: {
                    'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_WEATHER_KEY,
                    'X-RapidAPI-Host': process.env.REACT_APP_RAPIDAPI_WEATHER_HOST
                }
            });

            setWeather(response.data);

            if (response.data && response.data.weather && response.data.weather[0]) {
                const condition = response.data.weather[0].main.toLowerCase();
                const date = new Date();
                const hours = date.getHours();
                if (condition.includes('clear')) {
                    setWeatherIcon(hours < 18 ? <WiDaySunny size={50} /> : <WiNightClear size={50} />);
                } else if (condition.includes('cloud')) {
                    setWeatherIcon(<WiCloud size={50} />);
                } else if (condition.includes('rain')) {
                    setWeatherIcon(<WiRain size={50} />);
                }
            } else {
                console.error('Unexpected API response structure:', response.data);
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    }, []);

    useEffect(() => {
        getGreeting();
        getWeather();
    }, [getGreeting, getWeather]);

    const backgroundStyle = {
        backgroundImage: `url(${dashboardPromo})`,
    };

    return (
        <section className="welcome">
            <div className="flex flex-row justify-between w-full gap-3">
                <div className="flex flex-row items-center w-full bg-gray-800 rounded-md py-2 px-2">
                    <div>
                        <p className='text-md'>{greeting}, Alex!</p>
                        {weather && (
                            <div className="flex items-center text-gray-500 text-smi py-2">
                                <span className={`${greeting === "Good Morning" ? "text-yellow-400" : greeting === "Good Afternoon" ? "text-orange-500" : "text-white"}`}>{weatherIcon}</span>
                                <span className='ml-2'>
                                    {weather.main && weather.main.temp !== undefined
                                        ? `${(weather.main.temp - 273.15).toFixed(1)}°C`
                                        : 'Temperature N/A'}
                                    {weather.weather && weather.weather[0] && weather.weather[0].description
                                        ? ` and ${weather.weather[0].description}`
                                        : ''}
                                </span>
                            </div>
                        )}
                        <p className='text-xs text-gray-500'>{today}</p>
                    </div>
                </div>

                <div className="card-image flex flex-col justify-center w-1/2 md:w-1/3 lg:w-1/3 gap-1 rounded-md py-2 px-2 cursor-pointer relative overflow-hidden group" style={backgroundStyle}>
                    <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-all duration-300 group-hover:backdrop-blur-0"></div>
                    <p className='text-sm text-white'>Unlock the dashboard Pro!</p>
                    <p className='text-[10px] text-white'>Unlimited sessions, recordings, and many more!</p>
                </div>
            </div>
        </section>
    );
};

export default DashboardBannerComponent;