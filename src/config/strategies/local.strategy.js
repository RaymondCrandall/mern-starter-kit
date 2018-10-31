import chalk from 'chalk';
import passport from 'passport';
import { Strategy } from 'passport-local';
import { MongoClient } from 'mongodb';

const debug = require('debug')('app:local.strategy');

// Passport authentication strategy
function localStrategy() {
  // create strat
  passport.use(new Strategy(
    // pass options
    {
      usernameField: 'username',
      passwordField: 'password',
    // pass verification function
    }, (username, password, done) => {
      // check our local database
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';
      (async function mongo() {
        let client;
        try {
          // await connection to local database 'url'
          client = await MongoClient.connect(url);
          debug(chalk.green('Connected correctly to server'));

          // choose specific database, and collection within database
          const db = client.db(dbName);
          const col = db.collection('users');

          // search for 'username'
          const user = await col.findOne({ username });

          // compare user's password with 'password'
          if (user.password === password) {
            done(null, user);
          } else {
            done(null, false);
          }
        } catch (err) {
          debug(err.stack);
        }
        // Close connection
        client.close();
      }());
    },
  ));
}

export default localStrategy;
