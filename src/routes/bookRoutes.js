import express from 'express';
import bookController from '../controllers/bookController';
import bookService from '../services/goodreadsService';


// Create router instance
const bookRouter = express.Router();

// Create a router with routes to our book resources
function createRouter(nav) {
  // Access the specific functions of bookController
  const {
    getIndex,
    getById,
    userMiddleware,
  } = bookController(bookService, nav);

  // Check if user is logged into our site
  bookRouter.use(userMiddleware);

  bookRouter.route('/')
    // Display 'books' root
    .get(getIndex);
  bookRouter.route('/:id')
    // Display a single book resource
    .get(getById);

  return bookRouter;
}

export default createRouter;
