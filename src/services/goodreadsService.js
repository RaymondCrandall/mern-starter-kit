import axios from 'axios';
import xml2js from 'xml2js';

const debug = require('debug')('app:goodreadsService');


// create parser to transform xml into json
const parser = xml2js.Parser({ explicitArray: false });

// Connect to the GoodReads API and return a single book's data/details
function goodreadsService() {
  // Get data by book ID
  function getBookById(id) {
    // return promise result upon success (resolve with data) or error (reject with error)
    return new Promise((resolve, reject) => { // <--- DEV KEY
      // make http call to api
      axios.get(`https://www.goodreads.com/book/show/${id}.xml?key=RHGLlD8VDwQmN1SytYD9A`)
        .then((response) => {
          // parse response from xml to json
          parser.parseString(response.data, (err, result) => {
            if (err) {
              debug(err);
            // if no error, resolve promise with our book data
            } else {
              debug(result.GoodreadsResponse.book.image_url);
              resolve(result.GoodreadsResponse.book);
            }
          });
        })
        .catch((error) => {
          debug(error);
          reject(error);
        });
    });
  }

  return { getBookById };
}

export default goodreadsService();
