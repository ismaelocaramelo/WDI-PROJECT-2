module.exports = {
  register: authenticationsRegister,
  login: authenticationsLogin
};

const User           = require('../models/user');
const config         = require('../config/config');
const jwt            = require('jsonwebtoken');         // used to create, sign, and verify tokens
//const expressjwt     = require('express-jwt');

function authenticationsRegister(req, res){
  console.log('estamos en register');

  User.create(req.body.user, (err, user) => {
    if (err) return res.status(500).json({success: false, message: `Something went wrong: ${err.message}` });
    if (!user) return res.status(500).json({success: false, message: 'No user has been created' });
    const token = jwt.sign({id: user._id}, config.secret, {expiresIn: 60 * 60} );
    return res.status(201).json({success: true, message: `Welcome ${user.username}!`, user, token});
  });
}

function authenticationsLogin(req, res){
  console.log(req.body.user.email);
  User.findOne({ email: req.body.user.email }, (err, user) => {
    if (err) return res.status(500).json({success: false, message: 'Something went wrong.' });
    if (!user) return res.status(301).json({success: false, message: 'No user was found' });

    if(!user.validatePassword(req.body.user.password)) {
      return res.status(401).json({success: false, message: 'Unauthorized.' });
    }

    const token = jwt.sign({id: user._id}, config.secret, {expiresIn: 60 * 60} );
    return res.status(200).json({success: true, message: 'Welcome back.', user, token});
  });
}
