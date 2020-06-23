import React from 'react'
import Country from './Country'

const FormatCountries = ({countries}) => {
    if (countries.length > 10){
        return <div>Too many matches, specify another filter</div>
    }

    return (
        <Country countries={countries}/>
    )
}

export default FormatCountries