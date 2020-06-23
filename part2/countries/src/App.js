import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Input from './components/Input'
import FormatCountries from './components/FormatCountries'


function App() {
  const [ findCountry, setFindCountry ] = useState("") 
  const [ countries, setCountries ] = useState({})


  const handleFindCountry = (e) => {
    setFindCountry(e.target.value)
  }

  useEffect(() => {
    axios.get(`https://restcountries.eu/rest/v2/name/${findCountry}`)
    .then(resp => {
        setCountries(resp.data)
    })
    .catch(resp => {
      setCountries("")
    })
}, [findCountry])

  return (
    <div>
      <Input name="find countries " value={findCountry} onChange={handleFindCountry}/>
      <FormatCountries countries={countries}/>
    </div>
  );
}

export default App;
