import React, {useEffect, useState} from 'react'
import axios from 'axios'

const Weather = ({country}) => {
    const [ weather, setWeather] = useState({})
    const api_key = process.env.REACT_APP_API_KEY
    const weatherUrl = `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`

    useEffect(() => {
        axios.get(weatherUrl)
        .then(resp => {
            setWeather(resp.data.current)
            console.log(weather)
        }).catch(resp => {
            console.log(`Error getting weather for ${country.capital}`)
        })
    }, [country])

    return (
        <div>
            <h3>Weather in {country.capital}</h3>
            <div>
                <b>Temperature: </b>
                {weather.temperature} Celcius
            </div>
            <div>
                <img src={weather.weather_icons} alt="Weather"/>
            </div>
            <div>
                <b>Wind: </b>
                {weather.wind_speed} mph direction {weather.wind_dir}
            </div>
        </div>
    )
}

export default Weather