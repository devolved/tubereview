var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/tube';

// add review
router.get('/', function(req, res, next) {
  res.render('add');
});


// show review
// make a length check and error catch too!
router.get('/:chanName', function(req, res, next) {
  if (req.params.chanName != 'add' && req.params.chanName.length > 5) {
   var myData = {};  

    MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
      if (err) { return console.log('Unable to connect to MongoDB'); } 

      //get result from db     
      client.db('tube').collection('channel-reviews').find({'channel': req.params.chanName}).toArray(function(err, result) {
        if (err) throw err;
        
        myData = result[0];
        
        client.close();  
        res.render('review', {myData} );    
      });



    });
      
  } else {
    res.render('add');
  }
});
  
// submit review
router.post('/add', function(req, res, next) {

    var review = {
        channel: req.body.chanName,
        chanURL: req.body.chanURL,
        score: req.body.ratingScore,
        title: req.body.ratingTitle,
        content: req.body.ratingContent
    };

    MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {

      if (err) { return console.log('Unable to connect to MongoDB'); } 

      client.db('tube').collection('channel-reviews').insertOne(review, (err, result) => {
        
        if (err) { return console.log('Not inserted', err); }

      });

      client.close();
      res.redirect('../review/' + review.channel);

    });

});

module.exports = router;