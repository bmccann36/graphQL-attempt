import path from 'path';
import express from 'express';

// namespace express import express
import graphqlHTTP from 'express-graphql'
import 'morgan';
import 'body-parser';

const schema = require('./schema')

const app = express()


app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

app.listen(4000)
console.log('listening')

