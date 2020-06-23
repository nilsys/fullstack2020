import React, {useState} from 'react'
import Country from './Country'

const Countries = ({countries}) => {
    const [ showCountry, setShowcountry ] = useState("")

    const handleClick = (name) => {
        showCountry !== name ? setShowcountry(name) : setShowcountry("")
    }

    if (countries.length === 1) {
        return <Country country={countries[0]}/>
    }

    return (
        <div>
        {Object.keys(countries).map(country => {
            const name = countries[country].name
            return(
                <div key={name}>
                    {name}
                    <button key={name} onClick={() => handleClick(name)}>show</button>
                    {showCountry === name ? <Country country={countries[country]}/> : null}
                </div>
            )
        })}
       </div> 
    )
}

export default Countries