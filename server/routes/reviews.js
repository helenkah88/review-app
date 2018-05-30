let express = require('express');
let router = express.Router();
let multer = require('multer');

let storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function(req, file, cb) {
    cb(null, +new Date() + file.originalname);
  }
});

let fileFilter = function(req, file, cb) {
  if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg' || file.mimetype == 'image/png') {
    cb(null, true);
  } else {
    cb(null, flase);
  }
};

let upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

let reviewCtrl = require('../controllers/ownersReviews');

// get single review
router.get('/:reviewId', reviewCtrl.getSingle);

// update a review
router.put('/:reviewId', upload.array('reviewImg'), reviewCtrl.update);

// create new review
router.post('/', upload.array('reviewImg'), reviewCtrl.addReview);

// delete a review
router.delete('/:reviewId', reviewCtrl.deleteReview);

// delete an image
router.delete('/:reviewId/:imgIndex', reviewCtrl.deleteReviewImage);

module.exports = router;