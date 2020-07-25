import React, { useEffect } from 'react'
import { useQuery } from "@apollo/client"
import { ALL_AUTHORS } from "../queries"

const Authors = (props) => {
    if (!props.show) {
        return null
    }


    if (props.authors.loading){
        return <div>Loading...</div>
    }

    return (
        <div>
            <h2>Authors</h2>
            <table>
                <tbody>
                <tr>
                    <th></th>
                    <th>
                    Born
                    </th>
                    <th>
                    Books
                    </th>
                </tr>
                {props.authors.data.allAuthors.map(a =>
                    <tr key={a.name}>
                    <td>{a.name}</td>
                    <td>{a.born}</td>
                    <td>{a.bookCount}</td>
                    </tr>
                )}
                </tbody>
            </table>

        </div>
    )
}

export default Authors
