import { makeExecutableSchema } from 'graphql-tools'
import { importSchema } from "graphql-import";
import resolvers from './resolvers'; 

// Define our schema using the GraphQL schema language
const typeDefs = importSchema("./graphql/schema.graphql");

module.exports = makeExecutableSchema({ typeDefs, resolvers })
