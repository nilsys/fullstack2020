import React, {useState} from 'react'
import { useQuery } from "@apollo/client"
import { ALL_BOOKS} from "../queries"
import Filters from "./Filters"

const Books = () => {
    
const result = useQuery(ALL_BOOKS)
const [filters, setFilters] = useState()

    if(result.loading){
        return <div>Loading..</div>
    }


  return (
    <div>
        <h2>Books</h2>

        <div>
            Filtering by genre {filters ? <b>{filters}</b> : <i>None</i>}
        </div>
        <Filters books={result.data.allBooks} filters={filters} setFilters={setFilters} />

        <table>
            <tbody>
            <tr>
                <th></th>
                <th>
                Author
                </th>
                <th>
                Published
                </th>
            </tr>
            {result.data.allBooks.filter(filter => {
                if (!filters) return true
                return filter.genres.includes(filters)
            }).map(a =>
                <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
                </tr>
            )}
            </tbody>
        </table>
    </div>
  )
}

export default Books