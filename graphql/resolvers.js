import User from "../models/user";
import config from "../config";
import mutations from "./mutations";

const jsonwebtoken = require("jsonwebtoken");

const resolvers = {
  Query: {
    me: async (_, variables, ctx) => {
      // (Login) Getting token by id, pw
      // token 생성~~
	const ctxUser = ctx.user; //확인된(verified) user context이므로 신용해도 된다.
	
	const user = await User.findOne({id:ctxUser.id});
	console.log(user);
	return user;
    }
  },
  Mutation: {
    login: mutations.login
  }
};

export default resolvers;
