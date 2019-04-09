const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017/tube';

/* get channels */
router.get('/', function(req, res, next) {

  // get reviews
  MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    if (err) { return console.log('Unable to connect to MongoDB'); } 
   
    client.db('tube').collection('channel-reviews').find({}).sort({channelTitle: 1}).toArray(function(err, chanList){
      if (err) throw err;   
      client.close();
      //output page
      res.render('channels', {title: 'Channel list', chanList});

    });
  });
});

module.exports = router;