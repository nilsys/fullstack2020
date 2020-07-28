const { ApolloServer, gql, UserInputError } = require('apollo-server')
require("dotenv").config()
const mongoose = require('mongoose')
const Book = require("./models/book")
const Author = require("./models/author")

mongoose.set('useFindAndModify', false)
const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
    type Book {
        title: String!
        author: Author!
        published: Int!
        genres: [String]!
        id: ID!
    }

    type Author {
        name: String!
        born: Int
        bookCount: Int!
    }

    type Query {
        bookCount: Int!
        authorCount: Int!
        allAuthors: [Author!]!
        allBooks(author: String, genre: String): [Book]!
    }

    type Mutation {
        addBook(
        title: String!
        author: String!
        published: Int!
        genres: [String]!
        ): Book

        editAuthor(
            name: String!
            setBornTo: Int
        ): Author
    }

`
const handleNewAuthor = async (name) => {
    let author = await Author.findOne({name: name})
    if (!author){
        author = new Author({name: name})
        await author.save()
        console.log(`Author ${author.name} created.`)
    }
    return await author._id
}

const resolvers = {
  Query: {
      bookCount: () =>  Book.collection.countDocuments(),
      authorCount: () => Author.collection.countDocuments(),
      allAuthors: () => {
        return Author.find({})

    },
      allBooks: (root, args) => {
          if (!args.genre) {
              return Book.find({})
          }
          
          return Book.find({genres: {$in: [args.genre]}})
      }
  },
  Author: {
      name: async (root) =>  {
        const author = await Author.findOne({name: root.name})
        return author.name
      },
      born: async (root) => {
        const author = await Author.findOne({name: root.name})
        return author.born
      },
      bookCount: async (root) => {
          const count = await Book.find({author: root._id})
          return count.length
      }
  },
  Book: {
    author: async (root) => {
        const author = await Author.findOne({_id: root.author})
        return {
            name: author.name,
            born: author.born
        }
    }
  },
  Mutation : {
    addBook: async (root, args) => {
        const author = await handleNewAuthor(args.author)

        const book = new Book({
            title: args.title,
            published: args.published,
            genres: args.genres,
            author: author
        })

        try {
            await book.save()
            console.log(`Book ${args.title} created`)
        } catch (error) {
            console.log("Error creating new book")
            throw new UserInputError("Book exists already", {
                invalidArgs: args
            })
        }
        return book
    },
    editAuthor: async (root, args) => {
        const author = await Author.findOne({name: args.name})
        if (!author){
            throw new UserInputError("Invalid author", {
                invalidArgs: args
            })
        }
        author.born = args.setBornTo
        await author.save()     
        return author
    }
  }

  }


const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})