import React, {useState, useEffect} from 'react'
import { useLazyQuery, useQuery } from "@apollo/client"
import { BOOKS_BY_GENRE, ALL_BOOKS } from "../queries"
import Filters from "./Filters"

const Books = () => {
    const [filters, setFilters] = useState("")
    const allBooks = useQuery(ALL_BOOKS)
    const [getBooks, result] = useLazyQuery(BOOKS_BY_GENRE)
    const [books, setBooks] = useState([])

    useEffect(() => {
        getBooks({variables: {genre: filters}})
        if (result.data) {
            setBooks(result.data.allBooks)
        }
    }, [result.data, filters]) //eslint-disable-line


    return (
        <div>
            <h2>Books</h2>

            <div>
                Filtering by genre {filters ? <b>{filters}</b> : <i>None</i>}
            </div>
            {!allBooks.loading ?
            <Filters books={allBooks.data.allBooks} filters={filters} setFilters={setFilters} /> : null}
            
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
                
                {!result.loading ? books.map(a =>
                    <tr key={a.title}>
                    <td>{a.title}</td>
                    <td>{a.author.name}</td>
                    <td>{a.published}</td>
                    </tr>
                ) :
                <tr>
                    <td>
                        Loading...
                    </td>
                </tr>
                }
                </tbody>
            </table>
        </div>
    )
}

export default Books