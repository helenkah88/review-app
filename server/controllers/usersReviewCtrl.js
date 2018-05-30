let Review = require('../models/Reviews');

module.exports.getAllReviews = (req, res) => {
  Review.find()
  .populate('user', '-password')
  .then(result => {
    let response = {
      count: result.length,
      data: result.map(item => {
        return {
          _id: item._id,
          title: item.title,
          description: item.description,
          user: item.user,
          reviewImgs: item.reviewImgs,
          location: item.location,
          request: {
            method: 'GET',
            url: 'http://localhost:3000/review/' + item.user._id + '/' + item._id
          }
        }
      })
    };

    res.status(200).json(response);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
};

module.exports.getSingle = (req, res) => {
  Review.findById(req.params.reviewId)
  .populate('user', '-password -__v')
  .then(result => {
    let response = {
      data: {
      _id: result._id,
      title: result.title,
      description: result.description,
      user: result.user,
      reviewImgs: result.reviewImgs,
      location: result.location
      },
      request: {
        method: 'PUT',
        url: 'http://localhost:3000/review/' + result.user + '/' + result._id
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