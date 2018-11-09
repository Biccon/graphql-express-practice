import express from "express";
import { ApolloServer } from "apollo-server-express";
import { importSchema } from "graphql-import";
import resolvers from "./graphql/resolvers";

const typeDefs = importSchema("./graphql/schema.graphql");

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
);
