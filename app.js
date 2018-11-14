import express from "express";
import { graphqlExpress, ApolloServer } from "apollo-server-express";

import bodyParser from "body-parser";
import morgan from "morgan";
import mongoose from "mongoose";
import config from "./config";
const port = process.env.PORT || 80;

import schema from "./graphql/schema";

const server = graphqlExpress({
  schema
});

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan("dev"));
//app.set("jwt-secret", config.secret);
//

app.use("/api", server);
//server.applyMiddleware({ app });

app.listen(port, () =>
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
