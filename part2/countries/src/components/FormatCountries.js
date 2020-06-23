import React from 'react'
import Countries from './Countries'

const FormatCountries = ({countries}) => {
    if (countries.length > 10){
        return <div>Too many matches, specify another filter</div>
    }

    return (
        <Countries countries={countries}/>
    )
}

export default FormatCountries