import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useQuery } from "@apollo/client"
import { ALL_AUTHORS, ALL_BOOKS } from "./queries"

const App = () => {
    const [page, setPage] = useState('authors')

return (
    <div>
        <div>
            <button onClick={() => setPage('authors')}>authors</button>
            <button onClick={() => setPage('books')}>books</button>
            <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors
        authors={useQuery(ALL_AUTHORS)}
        show={page === 'authors'}
      />

      <Books
        books={useQuery(ALL_BOOKS)}
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

    </div>
  )
}

export default App