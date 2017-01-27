'use strict';

const MongoClient = require('mongodb').MongoClient;
const {MongoClient} = require('mongodb');
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

MongoClient.connect(MONGODB_URI, (err, db) => {
  if(err){
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }
  // ==> We have a connection to the "test-tweets" db,
  //     starting here.
  console.log(`Connected to mongodb: ${MONGODB_URI}`);

  // db.collection('tweets').find({}, (err, results) => {
  //   if(err) throw err;
  //   console.log("for each item yielded by the cursor:");

  //   // results.each((err, item) => {
  //   //   console.log(' ', item);
  //   // });// end of each

  //   results.toArray((err, resultsArray) => {
  //     if (err) throw err;

  //     console.log("results.toArray:", resultsArray);
  //   });
  // });
  // db.collection('tweets').find().toArray((err, results) => {
  //   if(err) throw err;
  //   console.log('result array', results);
  // })

  function getTweets(callback) {
    db.collection('tweets').find().toArray((err, tweets) => {
      if (err){
        return callback(err);
      }
      callback(null, tweets);
    })// end of toArray
  }//end of function

  getTweets((err, tweets) => {
    if(err) throw err;

    console.log('logging each tweet:');
    for (let tweet of tweets) {
      console.log(tweet);
    }
  });

  db.close();
});