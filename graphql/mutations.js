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
					jsonwebtoken.sign({
						id:user.id,
					pw:user.pw
					},
					config.secret,
						{expiresIn: config.expiresIn})
				})

				return p
			} else {
				throw new Error('login failed');
			}
		}
	}

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
