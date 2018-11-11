import express from "express";
import { ApolloServer } from "apollo-server-express";
import { importSchema } from "graphql-import";

import bodyParser from "body-parser";
import morgan from "morgan";
import mongoose from "mongoose";
import config from "./config";
const port = process.env.PORT || 4000;

import resolvers from "./graphql/resolvers";

const typeDefs = importSchema("./graphql/schema.graphql");

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan("dev"));
app.set("jwt-secret", config.secret);

app.get("/", (req, res) => {
  res.send("hello jwt");
});

app.use("/api", require("./routes/api"));

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
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
