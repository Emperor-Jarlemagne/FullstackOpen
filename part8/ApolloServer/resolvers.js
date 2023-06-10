const { GraphQLError} = require('graphql')
const { UserInputError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const Book = require('./models/books')
const Author = require('./models/authors')
const User = require('./models/users')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub

const resolvers = {
    Query: {
      bookCount: async () => Book.collection.countDocuments(),
      authorCount: async () => Author.collection.countDocuments(),
      allBooks: async (root, args) => {
        // const { author, genre } = args
        // const books = await Book.find()
        if (args.author && args.genre) {
          return await Book.find({ author: args.author, genres: { $in: [args.genre] }})
        } else if (args.author) {
          return await Book.find({author: args.author})
        } else if (args.genre) {
          return await Book.find({genres: { $in: [args.genre] }}) 
        } else {
          return await Book.find({})
        }
      },
      findBooks: async (root, args) => Book.find({ title: args.title}),
      me: (root, args, context) => {return context.currentUser},
      allAuthors: async (root, args) => {
        return Author.find({}).populate('books')
      }
    },
    Author: {
      name: (root) => { return root.name},
      born: (root) => { return root.born},
      bookCount: async (root) => {
        const books = await Book.find({ author: root })
        return books.length
      },
      books: async (root) => {
        return Book.find({ author: root.id }, {populate: { path: 'author' }})
      }
    },
    Mutation: {
      addBook: async (root, args, context) => {
        const { title, author, published, genres } = args
        const currentUser = context.currentUser
        if (!currentUser) {
          throw new UserInputError('Not Authenticated', {
              invalidArgs: args.name,
                  error
          })
        } 
        if (title.length < 3) {
          throw new GraphQLError("Title Should Be At Least 3 Characters Long", {
            extensions: {
              code:'BAD_USER_INPUT'
            }
          })
        }
        if (author.length < 3) {
          throw new GraphQLError("Author Name Should Be At Least 3 Characters Long", {
            extensions: {
              code:'BAD_USER_INPUT'
            }
          })
        }
        const book = new Book({ title, author, published, genres})
        try {
          await book.save()
          await currentUser.books.push(book.id)
          await currentUser.save()
        } catch (error) {
          throw new GraphQLError("Saving book failed", {
            extensions: {
              code: 'BAD_USER_INPUT', 
              invalidArgs: args.name,
              error
            }
          })
        }
        pubsub.publish('BOOK_ADDED', { bookAdded: book })
        return book
    },
      editAuthor: async (root, args, context) => {
        const { name, setBornTo } = args
        const currentUser = context.currentUser
        if (!currentUser) {
          throw new GraphQLError("Not Authenticated", null, {
            extensions: {
              code: "UNAUTHENTICATED"
            }
          })
        }
        const author = await Author.findOne({ name })
            if (!author) {
              return null
            }
            author.born = setBornTo
            try {
              await author.save()
            } catch (error) {
              throw new GraphQLError('The Year Hasnt Changed!', {
                extensions: {
                  code: 'BAD_USER_INPUT',
                  invalidArgs: args.name,
                  error
                }
              })
            }
            return author
          },
        createUser: async (root, args) => {
          const user = new User({ 
            username: args.username,
            favoriteGenre: args.favoriteGenre })
          return user.save()
            .catch(error => {
              throw new GraphQLError('Creating the user failed', {
                extensions: {
                  code: 'BAD_USER_INPUT',
                  invalidArgs: args.name,
                  error
                }
              })
            })
        },
        login: async (root, args) => {
          const user = await User.findOne({ username: args.username })
          if ( !user || args.password !== 'secret' ) {
            throw new GraphQLError('Wrong Credentials', {
              extensions: {
                code: 'BAD_USER_INPUT'
              }
            })        
          }
          const userForToken = {
            username: user.username,
            id: user._id,
          }
          return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
        }
    },
    Subscription: {
        bookAdded: {
          subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
        },
      },
  }

  module.exports = resolvers