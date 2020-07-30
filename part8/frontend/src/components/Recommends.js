import React, { useState, useEffect } from "react"
import { useQuery, useLazyQuery } from "@apollo/client"
import { GET_USER, BOOKS_BY_GENRE } from "../queries"

const Recommends = () => {

    const [books, setBooks] = useState([])

    const result = useQuery(GET_USER)
    const [getBooks, booksResult] = useLazyQuery(BOOKS_BY_GENRE)

    useEffect(() => {
        if (result.data){
            getBooks({variables: {genre: result.data.me.favoriteGenre}})
            
        }
    }, [result.data]) //eslint-disable-line

    useEffect(() => {
        if(booksResult.data){
            setBooks(booksResult.data.allBooks)
        }
    }, [booksResult.data])
    
    if (result.loading){
        return <div>Loading..</div>
    }

    return (
        <div>
            <h2>Recommendations</h2>
            <div>
                Books in your favorite genre: <b>{result.data.me.favoriteGenre}</b>
            </div>
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
                {books.map(a =>
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

export default Recommends