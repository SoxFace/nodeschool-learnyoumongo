var mongo = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/learnyoumongo';

mongo.connect(url)
    .then(function (db) {

        db.collection('parrots')
            .count({
                age: {$gt: +process.argv[2]}
            })
            .then(function (count) {
                console.log(count);
                db.close();
            })
    })
    .catch(function (err) {
        console.error(err);
    });

/*
Here's the official solution in case you want to compare notes:

────────────────────────────────────────────────────────────────────────────────
    var mongo = require('mongodb').MongoClient
    var age = process.argv[2]

    var url = 'mongodb://localhost:27017/learnyoumongo'

    mongo.connect(url, function(err, db) {
      if (err) throw err
      var parrots = db.collection('parrots')
      parrots.count({
        age: {
          $gt: +age
        }
      }, function(err, count) {
        if (err) throw err
        console.log(count)
        db.close()
      })
    })
*/