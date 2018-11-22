import express from "express";
import { ApolloServer } from "apollo-server-express";

import bodyParser from "body-parser";
import mongoose from "mongoose";
import morgan from "morgan";
import jwt from "express-jwt";
import User from './models/user.js';

import config from "./config";
import schema from "./graphql/schema";
const port = process.env.PORT || 80;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));

const authMiddleware = jwt({
  secret: config.secret,
  credentialsRequired: false
});
app.use(authMiddleware); // apollo에 적용할지 app(express)에 적용할지 > app에 적용하는것

const path = "/api";
const apollo = new ApolloServer({
  schema,
  context: ({req}) => {
	  const token = req.headers.authrozations || '';

	  const user = null; // getUser(token)

	  return {user}
  },
});
apollo.applyMiddleware({ app, path });

app.listen(port, () =>
  console.log(`Server ready at http://localhost:${port}${apollo.graphqlPath}`)
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
