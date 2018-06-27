"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fetch = require('node-fetch');
const util = __importStar(require("util"));
const { GraphQLSchema, GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } = require('graphql');
var parseXML = util.promisify(require('xml2js').parseString);
const id = 4432;
const BookType = new GraphQLObjectType({
    name: 'Books',
    description: '....',
    fields: () => ({
        title: {
            type: GraphQLString,
            resolve: (thing) => {
                console.log(JSON.stringify(thing, null, 2));
                return thing.title[0];
            }
        },
        isbn: {
            type: GraphQLString
        }
    })
});
const AuthorType = new GraphQLObjectType({
    name: 'Author',
    description: '...',
    fields: () => ({
        name: {
            type: GraphQLString,
            resolve: (xml) => {
                return xml.GoodreadsResponse.author[0].name[0];
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve: (xml) => {
                return xml.GoodreadsResponse.author[0].books[0].book;
            }
        },
    })
});
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
                resolve: (root, args) => fetchAuthor(root, args)
            }
        }),
    })
});
function fetchAuthor(root, args) {
    return fetch(`https://www.goodreads.com/author/show.xml?id=${args.id}&key=ltxraZ8p2m2DQGr3k6ilQ`)
        .then((res) => {
        return res.text()
            .then((text) => {
            return parseXML(text);
        });
    });
}
const parsed = fetchAuthor('', { id: 4432 })
    .then((res) => {
    Object.keys(res.GoodreadsResponse); //?
    res.GoodreadsResponse.author[0].books[0]; //?
});
//# sourceMappingURL=schema.js.map