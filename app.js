const express = require('express');
const morgan = require('morgan');
const playstore = require('./playstore');

const app = express();

app.listen(8000, () => console.log('Listening on port 8000'))

app.use(morgan('common'));

app.get('/apps', (req, res) => {
    const { sort , genre } = req.query;

    if (sort) {
      if (!['Rating', 'App'].includes(sort)) {
        return res
          .status(400)
          .send('Sort must be one of rating or app');
      }
    };

    if (genre) {
        if (!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genre)) {
          return res
            .status(400)
            .send('Please select a valid genre from the dropdown');
        }
      };

    let results = playstore;

    let chosenGenre = req.query

    console.log(chosenGenre)

//    function search() {
//      return function (genre) {
//        for (var i = 0; i < genre.length; i++) {
//          if (genre.Genres[i] == genre) {
//            return true;
//          }
//        }
//        return false;
//      }
//    }
  

    function filterGenre() {
      results
        .filter(genre => {
          return genre.Genres == req.query.genre;
      });
    }
    
    if (genre) {
      if (req.query.genre == '') {
        return results
      }
      else if (genre.Genres == req.query.genre) {
        filterGenre()
      }
    };
  
    if (sort) {
      newResults
        .sort((a, b) => {
          return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
      });
    };

//    res.json(newResults)
  
    res.json(results);
});