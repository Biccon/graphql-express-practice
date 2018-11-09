const resolvers = {
  Query: { 
    getToken: (_, variables, a) => {
        // (Login) Getting token by id, pw
        // token 생성~~
        console.log(`id: ${variables.id}`);
        return null;
    }
  }
};

export default resolvers;
