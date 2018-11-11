import User from '../../../models/user';

exports.register = (req, res) => {
  const { username, password } = req.body;
  let newUser = null
  const create = (user) => {
    if(user) {
      throw new Error('username exists')
    } else {
      return User.create(username, password)
    }
  }

  const count = (user) => {
    newUser = user
    return User.count({}).exec()
  }

  const assign = (count) => {
    if(count === 1){
      return newUser.assignAdmin()
    } else {
      retun Promise.resolve(false)
    }
  }

  const respond = (isAdmin) => {
    res.json({
      message: 'registered successfully',
      admin: isAdmin ? true :false
    })
  }

  const onError = (error) => {
    res.status(409).json({
      message: error.message
    })
  }

  User.findOneByUsername(username)
  .then(create)
  .then(count)
  .then(assign)
  .then(respond)
  .catch(onError)
};
