import User from '../models/user.js';

exports.me = async (_, variables, ctx) => {
	const ctxUser = ctx.user;
	if(ctxUser){
		const user = await User.findOne({id: ctxUser.id});
		console.log(user);
		return user;
	}
	return null
};
