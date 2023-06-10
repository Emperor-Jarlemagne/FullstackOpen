import React, {useState, useEffect} from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const Weather = ({country}) => {
    const [weather, setWeather] = useState({})

    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${api_key}`)
            .then(response => {
                setWeather(response.data)
            })
            .catch(function(error) {
                console.log("Error", error.message)
                })
        }, [country])

    return (
        <div>
            <h1>Weather in {country.name}</h1>
            <div>
                Temperature: {weather.current?.temperature}
            </div>
            <div>
                <img src={weather.current?.weather_icons[0]} alt={weather.current?.weather_descriptions[0]} />
            </div>
            <div>
                Wind: {weather.current?.wind_speed} {weather.current?.wind_dir}
            </div>
        </div>
    )
}
export default Weather