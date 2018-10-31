import chalk from 'chalk';
import express from 'express';
import { MongoClient } from 'mongodb';
// import bookServices from '../services/goodreadsService';

const debug = require('debug')('app:adminRoutes');


// Create router instance
const adminRouter = express.Router();

// Mock book list
const books = [
  {
    title: 'The Art of Game Design',
    author: 'Jesse Schell',
    image: ' ',
    id: 3396933,
    read: false,
  },
  {
    title: 'Game Programming Patterns',
    author: 'Bob Nystrom',
    image: ' ',
    id: 15499449,
    read: false,
  },
  {
    title: 'Les Miserables',
    author: 'Victor Hugo',
    image: ' ',
    id: 24280,
    read: true,
  },
  {
    title: 'A Journey to the Center of the Earth',
    author: 'Jules Verne',
    image: ' ',
    id: 32829,
    read: false,
  },
];

// This route index 'localhost:port/admin' is visited in order to populate our database with books
// Add books to the above const array 'books' in order to expand the database
function createRouter() {
  adminRouter.route('/')
    // Currently no admin view, response (res) is json of our book collection
    // Async function to display 'response' AFTER we have inserted books into our db.collection
    .get(async (req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';
      let client;
      // try to do the following
      // await connection to database, await inserting then receiving data from our collection
      // and then, render json of our collection (response)
      try {
        client = await MongoClient.connect(url);
        debug(chalk.green('Connected correctly to server'));

        const db = client.db(dbName);

        const response = await db.collection('books').insertMany(books);
        res.json(response);
      // if we catch an err, do this
      } catch (err) {
        debug(chalk(err.stack));
      }

      client.close();
    });

  return adminRouter;
}

export default createRouter;
