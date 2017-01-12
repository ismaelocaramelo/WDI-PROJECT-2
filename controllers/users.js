const User = require('../models/user');

function usersIndex(req, res){
  User.find((err, users) => {
    if (err) return res.status(500).send();
    return res.status(200).json({ users: users });
  });
}

module.exports = {
  index: usersIndex
};
