import React from 'react'

const Country = ({country}) => {
        console.log(country)

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
            </div>
        )
    }

export default Country