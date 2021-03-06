import { gql  } from "@apollo/client"

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            name,
            born,
            bookCount
        }
    }
`

export const ALL_BOOKS = gql`
    query {
        allBooks {
        title,
        author {
            name
        },
        published,
        genres
        }
    }
`

export const BOOKS_BY_GENRE = gql`
    query booksByGenre ($genre: String!) {
        allBooks(genre: $genre){
            title,
            author {
                name
            },
            published
        }
    }
`

export const CREATE_BOOK = gql`
    mutation createBook ($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
        addBook(
            title: $title,
            author: $author,
            published: $published,
            genres: $genres
            ){
                title,
                author {
                    name
                },
                published,
                genres
            }
        }
    
`

export const UPDATE_YEAR = gql`
    mutation updateBirth ($name: String!, $setBornTo: Int!){
        editAuthor(
            name: $name,
            setBornTo: $setBornTo
        ){
            name,
            born
        }
    }
`

export const LOGIN_QUERY = gql`
    mutation loginUser ($username: String!, $password: String!){
        login(
            username: $username,
            password: $password
        ){
            value
        }
    }

`

export const GET_USER = gql`
    query {
        me {
            username,
            favoriteGenre,
            id
        }
    }
`

export const BOOK_ADDED = gql`
    subscription {
        bookAdded {
            title,
            author {
                name
            },
            published,
            genres
        }
    }

`