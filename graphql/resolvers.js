import User from '../models/user';
import jsonwebtoken from 'jsonwebtoken';

const resolvers = {
  Query: { 
    me: (_, {user}, ctx) => {
        // (Login) Getting token by id, pw
        // token 생성~~
        console.log(`id: ${user}`);
        return null;
    }
  }
};

export default resolvers;
