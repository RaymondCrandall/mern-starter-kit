import passport from 'passport';
import localStrat from './strategies/local.strategy';

// Our athentication strategy
localStrat();

// passportConfig defines middleware required for processing authentication
// -
function passportConfig(app) {
  // Initializing passport module
  app.use(passport.initialize());

  // Handling express (app) session
  app.use(passport.session());

  // Stores user in session
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  // Retrieves user from session
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
}

export default passportConfig;
