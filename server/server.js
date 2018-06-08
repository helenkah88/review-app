let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let cors = require('cors');

let app = express();

let port = process.env.PORT || 3000;

app.use(cors());

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://helenkah88:12848a88@ds249839.mlab.com:49839/review-app')
.then(() => console.log('connected'))
.catch((err) => console.log(err));

app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json());

let profileRoute = require('./routes/users');
let ownersReviewRoute = require('./routes/reviews');

let checkAuth = require('./controllers/authCtrl');

let signup = require('./controllers/signupCtrl');
let login = require('./controllers/loginCtrl');

let singleUserCtrl = require('./controllers/singleUserCtrl');
let usersReviewCtrl = require('./controllers/usersReviewCtrl');

// manage owner's reviews (accessible only from the owner's page)
app.use('/profile/review', ownersReviewRoute);

// get owner's profile (protected)
app.use('/profile', profileRoute);

// get a single user (unprotected)
app.get('/users/:userId', singleUserCtrl);

// get all users
app.use('/users', usersReviewCtrl.getAllUsers);

// get all reviews (unprotected)
app.use('/reviews', usersReviewCtrl.getAllReviews);

// get a single review (unprotected)
app.use('/review/:reviewId', usersReviewCtrl.getSingle);

app.post('/signup', signup);
app.post('/login', login);


app.use((req, res, next) => {
  let error = new Error('not Found');
  error.status = 404;

  next(error);
});

app.use((err, req, res) => {
  res.status(err.status).json({
    msg: err.message
  });
});

app.listen(port, () => console.log(`running on port ${port}`))