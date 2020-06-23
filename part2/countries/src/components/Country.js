import React from 'react'

const Country = ({countries}) => {
    if (countries.length === 1) {
        console.log(countries[0])
        const country = countries[0]

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
                <img src={country.flag} width="250px"/>
            </div>
        )
    }

    return (
        <div>
        {Object.keys(countries).map(country => {
            const name = countries[country].name
            return <div key={name}>{name}</div>
        })}
       </div> 
    )
}

export default Country