var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/tube';

/* GET home page. */
router.get('/', function(req, res, next) {

  // latest reviews
  MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    if (err) { return console.log('Unable to connect to MongoDB'); } 

    //get result from db     
    client.db('tube').collection('channel-reviews').find({}).limit(10).sort({ $natural: -1 }).toArray(function(err, result) {
      if (err) throw err;

      client.close();

      //output page
    res.render('index', { title: 'Tube Review', result });

    });
  });

});

module.exports = router;
