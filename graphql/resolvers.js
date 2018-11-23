import User from "../models/user";
import config from "../config";
import mutations from "./mutations";
import queries from './queries';

const jsonwebtoken = require("jsonwebtoken");

const resolvers = {
  Query: {
    me: queries.me
  },
  Mutation: {
    login: mutations.login,
    register: mutations.register
  }
};

export default resolvers;
