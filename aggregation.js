var mongo = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/learnyoumongo';

mongo.connect(url)
    .then(function (db) {

        db.collection('prices')
            .aggregate([
                {$match: {size: process.argv[2]}},
                {$group: {
                    _id: '1',
                    avg: {
                        $avg: '$price'
                    }

                }}
            ])
            .toArray()
            .then(function (result) {
                console.log(Number(result[0].avg).toFixed(2));
                db.close();
            })
    })
    .catch(function (err) {
        console.error(err);
    });
/*
Other operators used in the $group stage include:

  * `$avg`
  * `$first`
  * `$last`
  * `$max`
  * `$min`
  * `$push`
  * `$addToSet`

Here's the official solution in case you want to compare notes:

────────────────────────────────────────────────────────────────────────────────
    var mongo = require('mongodb').MongoClient
    var size = process.argv[2]

    var url = 'mongodb://localhost:27017/learnyoumongo'

    mongo.connect(url, function(err, db) {
      if (err) throw err
      var prices = db.collection('prices')
      prices.aggregate([
        { $match: {
          size: size
        }}
      , { $group: {
          _id: 'total'
        , total: {
            $avg: '$price'
          }
        }}
      ]).toArray(function(err, results) {
        if (err) throw err
        if (!results.length) {
          throw new Error('No results found')
        }
        var o = results[0]
        console.log(Number(o.total).toFixed(2))
        db.close()
      })
    })
*/