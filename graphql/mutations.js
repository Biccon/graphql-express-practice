import User from "../models/user";
import jsonwebtoken from 'jsonwebtoken';
import config from '../config';

exports.login = async (_, { id, pw }) => {
  const user = await User.findOne({id});
  if(user.verify(pw)){
	const token = jsonwebtoken.sign({
			id: user.id,
			nickname: user.nickname,
			email: user.email,
			admin: user.admin
		},
		config.secret,
		{ expiresIn: '1y' }
		);
	return token;
  }
  return null;
};

exports.register = async (_, { id, pw, nickname, email }) => {
  // id, pw, email, createdAt, lastLoginAt
  const user = await User.findOne({ where: { id } }); // id가 같은 회원이 있으면

  if (user) throw new Error("Already registered");
  
  return `${id} is created whose nickname is ${nickname}`;
};
