let User = require('../models/Users');
let Review = require('../models/Reviews');

module.exports.getProfile = (req, res) => {
  User.findById(req.params.userId)
  .populate('reviews')
  .then(result => {
    let response = {
      data: {
      _id: result._id,
      username: result.username,
      reviews: result.reviews
      },
      request: {
        method: 'PUT',
        url: 'http://localhost:3000/profile/' + result._id
      }
    };

    res.status(200).json(response);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      msg: err
    });
  });
};

module.exports.getLoggedinUser = (req, res) => {
  if(req.loggedUser._id) {
    User.findById(req.loggedUser._id)
    .then(result => {
      res.status(200).json({
        data: {
          _id: result._id,
          username: result.username,
          firstName: result.firstName,
          lastName: result.lastName,
          email: result.email
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        msg: err
      });
    });
  } else {
    res.status(500).json({
      msg: 'user not found'
    });
  }
}

module.exports.update = (req, res) => {
  User.update({_id: req.params.userId}, { $set: req.body})
  .then(result => {
    console.log(result);
    let response = {
      msg: "User updated",
      data: {
        ...req.body,
        _id: req.params.userId
      },
      request: {
        method: 'GET',
        url: 'http://localhost:3000/profile/' + req.params.userId
      }
    };

    res.status(201).json(response);
  })
  .catch(err => console.log(err));
};

module.exports.deleteUser = (req, res) => {
  User.remove({_id: req.params.userId})
  .then(result => {
    return Review.remove({user: req.params.userId});
  })
  .then(result => {
    let response = {
      _id: req.params.userId,
      msg: 'User deleted',
      request: {
        method: 'POST',
        url: 'http://localhost:3000/signup'
      }
    };

    res.status(200).json(response);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      msg: err
    });
  });
};