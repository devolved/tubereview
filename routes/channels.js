var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/tube';

/* get channels */
router.get('/', function(req, res, next) {
  
  var chanList = [];

  // latest reviews
  MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    if (err) { return console.log('Unable to connect to MongoDB'); } 

    //get unique IDs from db     
    client.db('tube').collection('channel-reviews').distinct('channelId', function(err, docs) {
      if (err) throw err;   
      docs.forEach(function(chan){
        
        client.db('tube').collection('channel-reviews').findOne({'channelId': chan})
          .then(item => { chanList.push(item) })
          .catch(err => { console.error(err) });
      });

      client.close();
      //output page
      res.render('channels', {title: 'Channel list', chanList});

    });

  });

});

module.exports = router;