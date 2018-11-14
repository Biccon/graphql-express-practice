import User from "../models/user";
import config from "../config";
import mutations from "./mutations";

const jsonwebtoken = require("jsonwebtoken");

const resolvers = {
  Query: {
    me: (_, { user }, ctx) => {
      // (Login) Getting token by id, pw
      // token 생성~~
      console.log(`id: ${user}`);
      return null;
    }
  },
  Mutation: {
    login: mutations.login
  }
};

export default resolvers;
