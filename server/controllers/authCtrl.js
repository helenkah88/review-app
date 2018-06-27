let jwt = require('jsonwebtoken');
let User = require('../models/Users');


module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({
      msg: 'Unauthorized'
    });
  }
  let token = req.headers.authorization.split(' ')[1];

  try {
    let decoded = jwt.verify(token, 'secret');
    // console.log(decoded, req.params.userId);
    if(decoded.userId) {
      let loggedUser = {
        _id: decoded.userId
      };
      req.loggedUser = loggedUser;
      next();
    } else if (decoded.userId === req.params.userId) {
      req.authorized = true;
      next();
    } else {
      console.log(2);
      res.status(401).json({
        msg: 'Unauthorized'
      });
    }
  }
  catch(err) {
    console.log(err);
    res.status(401).json({
      msg: 'Unauthorized'
    });
  }
}