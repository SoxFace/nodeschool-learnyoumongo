var mongo = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/' + process.argv[2];

mongo.connect(url)
    .then(function (db) {

        db.collection('users')
            .updateOne({
                username: "tinatime"
            }, { // update
                $set: {
                    age: 40
                }
            })
            .then(function (result) {
                console.log(result);
                db.close();
            })
    })
    .catch(function (err) {
        console.error(err);
    });

    /*
        var mongo = require('mongodb').MongoClient

        var url = 'mongodb://localhost:27017/' + process.argv[2]
        mongo.connect(url, function(err, db) {
          if (err) throw err
          var collection = db.collection('users')
          collection.update({
            username: 'tinatime'
          }, {
            $set: {
              age: 40
            }
          }, function(err) {
            if (err) throw err
            db.close()
          })
        })
    */