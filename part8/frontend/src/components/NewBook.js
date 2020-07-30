import React, { useState } from 'react'
import { useMutation } from "@apollo/client"
import { CREATE_BOOK, ALL_BOOKS, ALL_AUTHORS, BOOKS_BY_GENRE } from "../queries"

const NewBook = () => {
    const [title, setTitle] = useState('')
    const [author, setAuhtor] = useState('')
    const [published, setPublished] = useState('')
    const [genre, setGenre] = useState('')
    const [genres, setGenres] = useState([])
    const [update, setUpdate] = useState(false)

    // My names spagoooooooooot
    const handleUpdate = () => {
        const query = genres.map(genre => {
            return {query: BOOKS_BY_GENRE, variables: {genre: genre}}
        })
        if (update) {
            setGenres([])
            setUpdate(false)
        }
        query.push({query: BOOKS_BY_GENRE, variables: {genre: ""}})
        return query
    }

    const [ createBook ] = useMutation(CREATE_BOOK, {
        refetchQueries: [{ query: ALL_BOOKS}, {query: ALL_AUTHORS }].concat(handleUpdate()),
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
        setGenre('')
        setUpdate(true)
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