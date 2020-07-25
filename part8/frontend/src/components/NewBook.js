import React, { useState } from 'react'
import { useMutation } from "@apollo/client"
import { CREATE_BOOK, ALL_BOOKS } from "../queries"

const NewBook = () => {
    const [title, setTitle] = useState('')
    const [author, setAuhtor] = useState('')
    const [published, setPublished] = useState('')
    const [genre, setGenre] = useState('')
    const [genres, setGenres] = useState([])

    const [ createBook ] = useMutation(CREATE_BOOK, {
        refetchQueries: [ { query: ALL_BOOKS } ],
        onError: (err) => {
            console.log(err)
        }
      })

    const submit = async (event) => {
        event.preventDefault()
        createBook({ variables: {title, author, published, genres}})

        setTitle('')
        setPublished('')
        setAuhtor('')
        setGenres([])
        setGenre('')
    }

    const addGenre = () => {
        setGenres(genres.concat(genre))
        setGenre('')
    }

  return (
    <div>
        <form onSubmit={submit}>
            <div>
            Title
            <input
                value={title}
                onChange={({ target }) => setTitle(target.value)}
            />
            </div>
            <div>
            Author
            <input
                value={author}
                onChange={({ target }) => setAuhtor(target.value)}
            />
            </div>
            <div>
            Published
            <input
                type='number'
                value={published}
                onChange={({ target }) => setPublished(Number(target.value))}
            />
            </div>
            <div>
            <input
                value={genre}
                onChange={({ target }) => setGenre(target.value)}
            />
            <button onClick={addGenre} type="button">Add genre</button>
            </div>
            <div>
            Genres: {genres.join(' ')}
            </div>
            <button type='submit'>Create book</button>
        </form>
    </div>
    )
}

export default NewBook