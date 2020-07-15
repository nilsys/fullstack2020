import { useState, useEffect } from "react"
import axios from "axios"

const useCountry = (name) => {
    const [country, setCountry] = useState(null)

    useEffect(() => {
        if (name !== ""){
            axios.get(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`)
            .then((resp) => {
                setCountry(Object.assign(resp.data[0], {found: true}))
            }).catch(() =>{
                setCountry({found: false})
            })
        } 
    }, [name])

    return country
}

export default useCountry