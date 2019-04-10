const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017/tube';

// add review
router.get('/add', function(req, res, next) {
  res.render('add', {title: 'Add a review'});
});


// show review on nav
router.get('/:ratingUrl', function(req, res, next) {

  if (req.params.ratingUrl != 'add') {
   var reviewData = {};  

    MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
      if (err) { return console.log('Unable to connect to MongoDB'); } 

      //get result from db     
      client.db('tube').collection('channel-reviews').findOne({'ratingUrl': req.params.ratingUrl}, function(err, result) {
        if (err) throw err;
        reviewData = result;
        client.close();

        // check a review exists
        if (result === undefined) {
          res.redirect('/review/add');
        } else {
          res.render('review', {title: reviewData.channelTitle, reviewData}, );
        }

      });

    });
      
  } else {
    res.redirect('/review/add');
  }
});
  
// submit review
router.post('/add', function(req, res, next) {

  MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    if (err) { return console.log('Unable to connect to MongoDB'); } 

    // change review text to <p> formatted
    let rContent = req.body.ratingContent;
    rContent = rContent.match(/[^\r\n]+/g).join('</p><p>');
    rContent = '<p>' + rContent + '</p>';
    
    // prep review 
    let review = {
      ratingScore: req.body.ratingScore,
      ratingTitle: req.body.ratingTitle,
      ratingContent: rContent,
      ratingBy: "admin"
    };

    // check if channel is already reviewed
    client.db('tube').collection('channel-reviews').findOne({ channelId: req.body.channelId }, function(err, doc){
      // if no channel entry create one
      if (!doc){
        let chanInfo = {
          channelId: req.body.channelId,
          channelTitle: req.body.channelTitle,
          channelBanner: req.body.channelBanner,
          channelThumb: req.body.channelThumb,
          channelDescription: req.body.channelDescription,
          ratingUrl: req.body.ratingUrl,
          reviews: []
        }        
        // insert channel entry
        client.db('tube').collection('channel-reviews').insertOne(chanInfo, (err, result) => {
          if (err) { return console.log('Channel not inserted', err); }    
        });      
      } // end if 

      // add new review
      client.db('tube').collection('channel-reviews').updateOne(
        {channelId: req.body.channelId},
        {$push: {reviews: review}}
      );


    client.close();
    res.redirect('../review/' + req.body.ratingUrl);
    });
  });

});

module.exports = router;