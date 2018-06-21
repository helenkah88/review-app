let User = require('../models/Users');
let Review = require('../models/Reviews');

module.exports.getSingle = (req, res) => {
  Review.findById(req.params.reviewId)
  .populate('user', '-password')
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

module.exports.update = (req, res) => {
  let files = req.files.map(file => file.path);
  Review.findByIdAndUpdate(req.params.reviewId, { $set: req.body, $push: { reviewImgs: { $each: files} }})
    .then(result => {
      let response = {
        msg: "Review updated",
        data: {
          _id: result._id,
          title: result.title,
          user: result.user,
          reviewImgs: result.reviewImgs,
          location: result.location
        },
        request: {
          method: 'GET',
          url: 'http://localhost:3000/review/' + result.user + '/' + req.params.reviewId
        }
      };

      res.status(201).json(response);
    })
    .catch(err => console.log(err));
};

module.exports.addReview = (req, res) => {
  let newReview = {
    title: req.body.title,
    user: req.body.user,
    reviewImgs: req.files.map(file => {
      return file.path
    }),
    location: req.body.location,
    description: req.body.description
  };
  Review.create(newReview)
    .then(result => {
      return result;
    })
    .then(result => {
      User.findByIdAndUpdate(req.body.user, {$push: {reviews: result._id}}, {new: true})
      .then(() => {
        let response = {
        msg: "Review created",
        data: {
          _id: result._id,
          title: result.title,
          user: result.user,
          reviewImgs: result.reviewImgs,
          location: result.location
        },
        request: {
          method: 'GET',
          url: 'http://localhost:3000/review/' + result.user + '/' + result._id
        }
      };
        res.status(201).json(response);
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        msg: err
      });
    });
};

module.exports.deleteReview = (req, res) => {
  Review.findByIdAndRemove(req.params.reviewId)
    .then(result => {
      return result;
    })
    .then(result => {
      User.findByIdAndUpdate(result.user, {$pull: {reviews: req.params.reviewId}})
      .then((result) => {
        let response = {
          _id: req.params.reviewId,
          userId: result._id,
          msg: `Review ${req.params.reviewId} deleted`,
          request: {
            method: 'POST',
            url: 'http://localhost:3000/reviews'
          }
        };
        res.status(200).json(response);
      })
      .catch(err => {
        return err;
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        msg: err
      });
    });
};

module.exports.deleteReviewImage = (req, res) => {
  Review.findById(req.params.reviewId)
  .then(result => {
    if(result) {
      return result;
    } else {
      throw new Error('Review not found');
    }
  })
  .then(result => {
    Review.findByIdAndUpdate(req.params.reviewId, {$pull: {reviewImgs: result.reviewImgs[req.params.imgIndex]}})
    .then(result => {
      let response = {
        msg: `Image ${req.params.imgIndex} deleted`,
        request: {
          method: 'POST',
          url: 'http://localhost:3000/reviews'
        }
      };
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        msg: err
      })
    });
  })
}