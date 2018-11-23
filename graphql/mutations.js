import User from "../models/user";
import jsonwebtoken from 'jsonwebtoken';
import config from '../config';

exports.login = (_, { id, pw }) => {
  const secret = config.secret;
  const check = (user) => {
	if(!user){
		throw new Error('login failed');
	} else {
		if(user.verify(pw)){
			const p = new Promise((res, rej) => {
				console.log(user);
				const token = jsonwebtoken.sign({
					id:user.id,
					nickname:user.nickname,
					email:user.email,
					admin:user.admin
				},
				config.secret,
				{expiresIn: '1y'});
				res(token)
			}, (err, token) => {
				if(err) reject(err)
				res(token)
			})
			return p
		} else {
			throw new Error('login failed');
		}
	}
  };
  
  return User.findOne({id})
	.then(check)
	.then((token) => {
		console.log('created token', token);
		return token;
	});
};

exports.register = (_, { id, pw, email }) => {
  // id, pw, email, createdAt, lastLoginAt
  const user = User.findOne({ where: { id } }); // id가 같은 회원이 있으면

  if (user) throw new Error("Already registered");

  User.create();
};
