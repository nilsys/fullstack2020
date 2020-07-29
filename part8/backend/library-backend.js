const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const jwt = require("jsonwebtoken")
require("dotenv").config()
const mongoose = require('mongoose')
const Book = require("./models/book")
const Author = require("./models/author")
const User = require("./models/user")

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
    type User {
        username: String!
        favoriteGenre: String!
        id: ID!
    }
    
    type Token {
        value: String!
    }

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
        me: User
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

        createUser(
            username: String!
            favoriteGenre: String!
          ): User

        login(
            username: String!
            password: String!
          ): Token
    }

`
const handleAuthor = async (name) => {
    let author = await Author.findOne({name: name})
    if (!author){
        author = new Author({name: name})
        await author.save()
        console.log(`Author ${author.name} created.`)
    }
    return await author._id
}

const JWT_TOKEN = "REALLY_SECRET_TOKEN"

const resolvers = {
  Query: {
      bookCount: () =>  Book.collection.countDocuments(),
      authorCount: () => Author.collection.countDocuments(),
      allAuthors: () => Author.find({}),
      allBooks: (root, args) => {
          if (!args.genre) {
              return Book.find({})
          }
          
          return Book.find({genres: {$in: [args.genre]}})
      },
      me: (root, args, context) => context.user 
      
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
    addBook: async (root, args, context) => {
        if (!context.user){
            throw new AuthenticationError("Invalid login", {
                invalidArgs: context
            })
        }
        const author = await handleAuthor(args.author)

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
    editAuthor: async (root, args, context) => {
        if (!context.user){
            throw new AuthenticationError("Invalid login", {
                invalidArgs: context
            })
        }
        const author = await Author.findOne({name: args.name})
        if (!author){
            throw new UserInputError("Invalid author", {
                invalidArgs: args
            })
        }
        author.born = args.setBornTo
        await author.save()     
        return author
    },
    createUser: async (root, args) => {
        const user = new User({username: args.username, favoriteGenre: args.favoriteGenre})
        try {
            await user.save()
        } catch (error) {
            throw new UserInputError(error.message), {
                invalidArgs: args
            }
        }
        return user
    },
    login: async (root, args) => {
        const user = await User.findOne({ username: args.username })

        if (!user || args.password !== "password") {
            throw new UserInputError("Wrong username or password")
        }
        const loggedUser = {
            username: user.username,
            id: user._id
        }
        return {value: jwt.sign(loggedUser, JWT_TOKEN)}
    }
  }

  }


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({req}) => {
      const auth = req ? req.headers.authorization : null
      if (auth && auth.toLowerCase().startsWith("bearer")) {
        const token = jwt.verify(auth.substring(7), JWT_TOKEN)
        const user = await User.findById(token.id)
        return { user }
      }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})