import express from 'express';
import authController from '../controllers/authController';


// Create router instance
const authRouter = express.Router();

// Create a router with routes to our auth resources
function createRouter(nav) {
  // Access the specific functions of authController
  const {
    postSignUp,
    getLogIn,
    postLogIn,
    allProfile,
    getProfile,
  } = authController(nav);

  authRouter.route('/signUp')
    // Post to 'signUp', store new user in database, then redirect to /auth/profile
    .post(postSignUp);
  authRouter.route('/logIn')
    // Display 'logIn'
    .get(getLogIn)
    // Post to 'logIn', authenticate user, then redirect depending on success
    .post(postLogIn());
  authRouter.route('/profile')
    // If we're logged in access profile, else redirect to '/'
    .all(allProfile)
    // Display 'profile'
    .get(getProfile);

  return authRouter;
}

export default createRouter;
