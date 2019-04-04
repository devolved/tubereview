var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/tube';

/* get channels */
router.get('/', function(req, res, next) {

  // get reviews
  MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    if (err) { return console.log('Unable to connect to MongoDB'); } 
   
    client.db('tube').collection('channel-reviews').find({}).sort({channelTitle: 1}).toArray(function(err, chanList){
      if (err) throw err;   
      console.log(chanList);
      client.close();
      //output page
      res.render('channels', {title: 'Channel list', chanList});

    });
  });
});

module.exports = router;