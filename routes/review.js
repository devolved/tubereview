var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/tube';

// add review
router.get('/add', function(req, res, next) {
  res.render('add');
});


// show review on nav
router.get('/:channelTitle', function(req, res, next) {

  if (req.params.channelTitle != 'add') {
   var reviewData = {};  

    MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
      if (err) { return console.log('Unable to connect to MongoDB'); } 

      //get result from db     
      client.db('tube').collection('channel-reviews').find({'channelTitle': req.params.channelTitle}).toArray(function(err, result) {
        if (err) throw err;
        
        reviewData = result[0];
        console.log(reviewData);
        client.close();

        // check a review exists
        if (result[0] === undefined) {
          res.redirect('/review/add');
        } else {
          res.render('review', {reviewData});
        }

      });

    });
      
  } else {
    res.redirect('/review/add');
  }
});
  
// submit review
router.post('/add', function(req, res, next) {

    var review = {
        channelTitle: req.body.channelTitle,
        channelUrl: req.body.channelUrl,
        channelBanner: req.body.channelBanner,
        channelThumb: req.body.channelThumb,
        channelDescription: req.body.channelDescription,
        channelSubs: req.body.channelSubs,
        channelViews: req.body.channelViews,
        ratingScore: req.body.ratingScore,
        ratingTitle: req.body.ratingTitle,
        ratingContent: req.body.ratingContent
    };

    MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {

      if (err) { return console.log('Unable to connect to MongoDB'); } 

      client.db('tube').collection('channel-reviews').insertOne(review, (err, result) => {
        
        if (err) { return console.log('Not inserted', err); }

      });

      client.close();
      res.redirect('../review/' + review.channelTitle);

    });

});

module.exports = router;