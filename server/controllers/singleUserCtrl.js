let User = require('../models/Users');

module.exports = (req, res) => {
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
          url: 'http://localhost:3000/users/' + result._id
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