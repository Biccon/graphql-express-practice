import mongoose from "mongoose";
const Schema = mongoose.Schema;

const User = new Schema({
  id: String,
  pw: String,
  email: String,
  admin: { type: Boolean, default: false },
  nickname: String,
	/*
  updatedAt: new Date(),
  $setOnInsert: {
    createdAt: new Date()
  }
  */
});

User.statics.create = function(id, pw, email) {
  const user = new this({
    id,
    pw,
    email,
    createdAt: new Date()
  });

  return user.save();
};

User.statics.findOneById = function(id) {
  return this.findOne({
    id
  }).exec();
};

User.methods.verify = function(pw) {
  return this.pw === pw;
};

User.methods.assignAdmin = function() {
  this.admin = true;
  return this.save();
};

module.exports = mongoose.model('User', User);
