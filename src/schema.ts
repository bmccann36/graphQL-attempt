const fetch = require('node-fetch')
import * as util from 'util'

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} = require('graphql')


var parseXML = util.promisify(require('xml2js').parseString);

const id = 4432


const BookType = new GraphQLObjectType({
  name: 'Books',
  description: '....',
  fields: () => ({
    title: {
      type: GraphQLString,
      resolve: (thing: any) => {
        console.log(JSON.stringify(thing, null, 2))
        return thing.title[0]
      }
    },
    isbn: {
      type: GraphQLString
    }
  })
})


const AuthorType = new GraphQLObjectType({
  name: 'Author',
  description: '...',

  fields: () => ({
    name: {
      type: GraphQLString,
      resolve: (xml: any) => {
        return xml.GoodreadsResponse.author[0].name[0]
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve: (xml: any) => {
        return xml.GoodreadsResponse.author[0].books[0].book
      }
    },
  })
})

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: '...',
    fields: () => ({
      author: {
        type: AuthorType,
        args: {
          id: { type: GraphQLInt }
        },
        resolve: (root: any, args: number) => fetchAuthor(root, args)
      }
    }),
  })
})

function fetchAuthor(root: any, args: any) {
  return fetch(
    `https://www.goodreads.com/author/show.xml?id=${args.id}&key=ltxraZ8p2m2DQGr3k6ilQ`)
    .then((res: any) => {
      return res.text()
        .then((text: any) => {
          return parseXML(text)
        })
    })
}

const parsed = fetchAuthor('', { id: 4432 })
  .then((res: any) => {
    Object.keys(res.GoodreadsResponse) //?
    res.GoodreadsResponse.author[0].books[0] //?
  })


