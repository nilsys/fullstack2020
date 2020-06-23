import React from 'react'
import Weather from './Weather'

const Country = ({country}) => {
        console.log(country)

        // Just a bubblegum check, because some countries don't have the capital set
        if (country.capital === ""){
            country.capital = "Helsinki"
        }

        return (
            <div>
                <h1>{country.name}</h1>
                <p>Capital {country.capital} </p>
                <p>Population {country.population} </p>

                <h3>Languages</h3>
                <ul>
                    {country.languages.map((language) => {
                        return <li key={language.name}>{language.name}</li>
                    })}
                </ul>
                <img src={country.flag} width="250px" alt="Flag of the country"/>
                <Weather country={country}/>
            </div>
        )
    }

export default Country