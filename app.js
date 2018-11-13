import express from "express";
import { ApolloServer } from "apollo-server-express";
import { importSchema } from "graphql-import";

import bodyParser from "body-parser";
import morgan from "morgan";
import mongoose from "mongoose";
import config from "./config";
const port = process.env.PORT || 80;

import schema from './graphql/schema';

const server = new ApolloServer({
 schema
});

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan("dev"));
app.set("jwt-secret", config.secret);

server.applyMiddleware({ app });

app.listen({ port }, () =>
  console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`)
);

mongoose.connect(
  config.mongodbUri,
  { useNewUrlParser: true }
);
const db = mongoose.connection;
db.on("error", console.error);
db.once("open", () => {
  console.log("DB connected well!!");
});
