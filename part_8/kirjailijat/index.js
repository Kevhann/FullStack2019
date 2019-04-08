const { ApolloServer, gql, UserInputError, PubSub } = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const pubsub = new PubSub()
const JWT_SECRET = 'most_secret_key'

mongoose.set('useFindAndModify', false)
const MONGODB_URI =
  'mongodb://library1:library1@ds013250.mlab.com:13250/library'
console.log('connecting to', MONGODB_URI)

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('mgongodb ines')
  })
  .catch(error => {
    console.log('virhe yhdistäessä', error.message)
  })

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }
  type Book {
    title: String!
    published: Int
    author: Author!
    id: ID!
    genres: [String]
  }
  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
    favouriteGenre: String
  }
  type Query {
    allAuthors: [Author!]!
    allBooks(author: String, genre: String): [Book!]!
    authorCount: Int!
    bookCount: Int!
    me: User
  }
  type Mutation {
    addBook(
      title: String!
      published: Int
      author: String!
      genres: [String]
    ): Book!
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favouriteGenre: String!): User!
    login(username: String!, password: String!): Token
  }
  type Subscription {
    bookAdded: Book
  }
`

const resolvers = {
  Query: {
    allAuthors: () => Author.find({}),
    bookCount: () => Book.count({}),
    authorCount: () => Author.count({}),
    allBooks: (root, args) => {
      const query = args.genre ? { genres: { $in: [args.genre] } } : {}
      console.log('allbooks:', query)
      return Book.find(query).populate('author', {
        name: 1,
        born: 1,
        bookCount: 1
      })
    },
    me: (root, args, context) => context.currentUser
  },
  Mutation: {
    addBook: async (root, args, context) => {
      console.log('context:', context.currentUser)
      if (!context.currentUser) throw new UserInputError('Invalid token')
      const book = { ...args }
      const authorResponse = await Author.findOne({ name: book.author })
      if (!authorResponse) {
        const newAuthor = new Author({ name: book.author })
        const authorRes = await newAuthor.save()
        book.author = authorRes._id
      } else {
        book.author = authorResponse._id
      }
      const bookkerino = new Book(book)
      try {
        const bookResponse = await bookkerino.save()
        const newBookResponse = await Book.findById(bookResponse._id).populate(
          'author',
          { name: 1, born: 1 }
        )
        pubsub.publish('BOOK_ADDED', { bookAdded: newBookResponse })
        return newBookResponse
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) throw new UserInputError('Invalid token')
      try {
        const uthor = { name: args.name, born: args.setBornTo }
        await Author.findOneAndUpdate({ name: args.name }, uthor)
        return uthor
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    },
    createUser: (root, args) => {
      const user = new User({ ...args })
      return user.save().catch(error => {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== 'lmao') {
        throw new UserInputError('väärä salasana dumbass')
      }
      const userForToken = {
        username: user.username,
        id: user._id
      }
      console.log('user', user)
      return {
        value: jwt.sign(userForToken, JWT_SECRET),
        favouriteGenre: user.favouriteGenre
      }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  },
  Author: {
    bookCount: async root => {
      const res = await Book.find({}).populate('author')
      return res.filter(b => b.author._id.equals(root._id)).length
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    console.log('auth:', auth)
    if (auth && auth.toLocaleLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})
