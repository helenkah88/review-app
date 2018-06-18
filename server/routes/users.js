let express = require('express');
let router = express.Router();
let checkAuth = require('../controllers/authCtrl');

let userCtrl = require('../controllers/userCtrl');

// get loggedin user
router.get('', checkAuth, userCtrl.getLoggedinUser);

// get single user
router.get('/:userId', checkAuth, userCtrl.getProfile);

// update a user
router.put('/:userId', checkAuth, userCtrl.update);

// delete a user
router.delete('/:userId', checkAuth, userCtrl.deleteUser);

module.exports = router;