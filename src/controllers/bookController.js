import chalk from 'chalk';
import { MongoClient, ObjectID } from 'mongodb';

const debug = require('debug')('app:bookController');


// Our app /books/... controller
function bookController(bookService, nav) {
  // Creating '/books' index
  function getIndex(req, res) {
    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryApp';

    // Async function for rendering our page AFTER awaiting our database
    (async function mongo() {
      let client;
      // try to do the following
      // await connection to database, await finding our collection, await data from our collection
      // and then, render bookListView with our data variables
      try {
        client = await MongoClient.connect(url);
        debug(chalk.green('Connected correctly to server'));

        const db = client.db(dbName);

        const col = await db.collection('books');

        const books = await col.find().toArray();
        res.render('bookListView',
          {
            title: 'Team Library',
            nav,
            books,
          });
      // if we catch an err, do this
      } catch (err) {
        debug(chalk.red(err.stack));
      }
    }());
  }

  // Creating '/books/bookId', a single book's page
  function getById(req, res) {
    const { id } = req.params;
    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryApp';

    // Async function for rendering our page AFTER awaiting our database and bookService API
    (async function mongo() {
      let client;
      // try to do the following
      // await connection to database, await finding our collection, await data from our collection
      // await book details (specifically we need the image) from GoodReads API
      // and then, render bookView with our data variables
      try {
        client = await MongoClient.connect(url);
        debug(chalk.green('Connected correctly to server'));

        const db = client.db(dbName);
        const col = await db.collection('books');
        const book = await col.findOne({ _id: new ObjectID(id) });
        debug(book);

        // Call bookService (goodreads api) to retreive book details; particularly book image
        book.details = await bookService.getBookById(book.id);
        res.render('bookView', {
          title: 'Team Library',
          nav,
          book,
        });
      // if we catch an err, do this
      } catch (err) {
        debug(chalk.red(err.stack));
      }
    }());
  }

  // Check if user is logged into our webapp
  function userMiddleware(req, res, next) {
    // If request (req) contains a user, then perform next() step
    if (req.user) { // req.user.admin OR req.admin.roles
      next();
    // Else, redirect to log in page
    } else {
      res.redirect('/auth/logIn');
    }
  }

  // Return the functions of bookController
  return {
    getIndex,
    getById,
    userMiddleware,
  };
}

export default bookController;
