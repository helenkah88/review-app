let User = require('../models/Users');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

module.exports = (req, res) => {
  let { username, password } = req.body;
  User.findOne({username})
  .then(user => {
    if (!user) {
      return res.status(401).json({
        msg: 'Auth failed'
      });
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (err || !result) {
        return res.status(401).json({
          msg: 'Auth failed'
        });
      }
      if (result) {
        let token = jwt.sign({userId: user._id}, 'secret', { expiresIn: 1800});
        res.status(200).json({
          _id: user._id,
          username,
          token,
          msg: 'Auth successful'
        });
      }
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      msg: err
    });
  });
}