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
      User.create(req.body)
      .then(result => {
        let token = jwt.sign({userId: result._id}, 'secret', { expiresIn: 1800});
        let response = {
          msg: "User created",
          token: token,
          data: {
            _id: result._id,
            username: result.username,
            firstName: result.firstName,
            lastName: result.lastName,
            email: result.email
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