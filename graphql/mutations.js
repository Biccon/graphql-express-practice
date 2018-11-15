import User from "../models/user";

exports.login = (_, { id, pw }) => {
  const user = User.findOne({ where: { id } });

  if (!user) {
    throw new Error("No user with that email");
  }

  const valid = pw === user.pw;

  if (!valid) {
    throw new Error(`pw err? ${pw} / ${user.pw} || ${valid}`);
  }

  // return json web token
  return jsonwebtoken.sign(
    {
      id: user.id,
      pw: user.pw
    },
    config.secret,
    { expiresIn: config.expiresIn }
  );
};

exports.register = (_, { id, pw, email }) => {
  // id, pw, email, createdAt, lastLoginAt
  const user = User.findOne({ where: { id } }); // id가 같은 회원이 있으면

  if (user) throw new Error("Already registered");

  User.create();
};
