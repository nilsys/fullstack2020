import React, {useState} from "react"
import {useMutation, useQuery} from "@apollo/client"
import { UPDATE_YEAR, ALL_AUTHORS } from "../queries"

const SetBirthyear = () => {
    const [name, setName] = useState("")
    const [setBornTo, setYear] = useState("")
    const [ updateYear ] = useMutation(UPDATE_YEAR, {
        refetchQueries: [ { query: ALL_AUTHORS } ],
        onError: (err) => {
            console.log(err)
        }
      })

    const authors = useQuery(ALL_AUTHORS)

    const handleSubmit = (e) => {
        e.preventDefault()
        updateYear({ variables: {name, setBornTo}})
        setYear("")
    }

    return (
        <div>
            <h2>Set Birthyear</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <select value={name} onChange={e => setName(e.target.value)}>
                        {authors.data.allAuthors.map(a => {
                            return <option key={a.name} value={a.name}>{a.name}</option>
                        })}
                    </select>
                </div>
                <div>
                    Born: <input value={setBornTo} onChange={e => setYear(Number(e.target.value))}/>
                </div>
                <div>
                    <button type="submit">Update Author</button>
                </div>
            </form>
        </div>
    )
}

export default SetBirthyear