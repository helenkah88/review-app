let User = require('../models/Users');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

module.exports = (req, res) => {
  console.log(req.body);
  User.find({username: req.body.username})
  .then(result => {
    if (result.length) {
      return res.status(409).json({
        msg: 'User exists'
      });
    }

    bcrypt.hash(req.body.password, 10, (err, hash) => {
      let newUser = {
        username: req.body.username,
        password: hash
      }
      
      User.create(newUser)
      .then(result => {
        let token = jwt.sign({userId: result._id}, 'secret', { expiresIn: 1800});
        let response = {
          msg: "User created",
          data: {
            token: token,
            _id: result._id,
            username: result.username
          },
          request: {
            method: 'GET',
            url: 'http://localhost:3000/login'
          }
        };

        res.status(201).json(response);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          msg: err
        });
      });
    });
  })
};