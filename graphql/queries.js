import User from '../models/user.js';

exports.me = async (_, variables, ctx) => {
	const ctxUser = ctx.user;
	console.log(ctx.user);
	if(ctxUser){
		const user = await User.findOne({id: ctxUser.id});
		console.log(user);
		console.log(user.nickname); // models/user.js 에서 schema 수정 해줘야함!!! 필수 기억
		return user;
	}
	return null
};
