import chalk from 'chalk';
import { MongoClient } from 'mongodb';
import passport from 'passport';

const debug = require('debug')('app:authRoutes');


// Our app /auth/... controller
function authController(nav) {
  // Post/insert new user into our database
  function postSignUp(req, res) {
    const { username, password } = req.body;
    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryApp';

    // Async function for rendering our profile page AFTER awaiting our database
    (async function addUser() {
      let client;
      // try to do the following
      // await connection to database, await finding our collection, await data from our collection
      // and then, redirect to new user's profile page
      try {
        client = await MongoClient.connect(url);
        debug(chalk.green('Connected correctly to server'));

        const db = client.db(dbName);

        const col = await db.collection('users');

        const user = { username, password };
        const results = await col.insertOne(user);
        debug(results);
        req.login(results.ops[0], () => {
          res.redirect('/auth/profile');
        });
      // if we catch an err, do this
      } catch (err) {
        debug(err);
      }
    }());
  }

  // Creating '/logIn'
  function getLogIn(req, res) {
    res.render('logIn', {
      title: 'Log In',
      nav,
    });
  }

  // Post/authenticate user log in data
  function postLogIn() {
    return passport.authenticate('local', {
      successRedirect: '/auth/profile',
      failureRedirect: '/',
    });
  }

  // Check if we have a user/user profile
  function allProfile(req, res, next) {
    if (req.user) {
      next();
    } else {
      res.redirect('/');
    }
  }

  // Creating '/profile'
  function getProfile(req, res) {
    // Currently no profile view, response (res) is json of our user
    res.json(req.user);
  }

  // /logout <-- create button that routes to
  // req.logout <-- on /logout call function

  // Return the functions of authController
  return {
    postSignUp,
    getLogIn,
    postLogIn,
    allProfile,
    getProfile,
  };
}

export default authController;
