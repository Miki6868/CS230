
//
// CRUD Example example based on MongoDB NodeJS Driver Docs
// Developed uisng the Quickstart Guide:
// http://mongodb.github.io/node-mongodb-native/3.5/quick-start/quick-start/
//
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
// const connect = require("./connect");       // url from connect module
const connect = require("./connect_atlas"); // url from connect module
const client = new MongoClient(connect.database.url, { useUnifiedTopology: true } );

// database name
const dbName = 'test';

// Use connect method to connect to the server
client.connect(function(err) {
  // using the assert module for testing
  assert.equal(null, err);
  console.log("Connected successfully to server");

  // use this database
  const db = client.db(dbName);

/* Uncomment this block to see insertMany()
  // do this work : insertMany()
  insertDocuments(db, function() {
    client.close();
  });
*/

/*  Uncomment this block to see findDocuments()
  // do some more work: findDocuments()
  // Note: thismight not work as expected (depending on what you
  // expect) if you leave the earlier block uncommented.
  // can you figure out why there may be an unexpected order
  // in the console messaging? might be an issue with the 
  // client.close() also - when is connection closed?
  findDocuments(db, function() {
    client.close();
  });
*/

/* Uncomment this block to see findDocuments() after insertMany()
  // we really need to be doing something like this
  // enter callback hell!
  insertDocuments(db, function() {
    findDocuments(db, function() {
      client.close();
    });
  });
});
*/

/* Uncomment this block to see findDocumentsFiltered() after insertMany()
  insertDocuments(db, function() {
    findDocumentsFiltered(db, function() {
      client.close();
    });
  });
*/

/* Uncomment this block to see updateDocument() after insertDocuments()
insertDocuments(db, function() {
    updateDocument(db, function() {
        findDocuments(db, function() {
            client.close();
          });
    });
});
*/

///* Uncomment this block to see removeDocument() after updateDocument() after insertDocuments()
insertDocuments(db, function() {
    updateDocument(db, function() {
      removeDocument(db, function() {
        client.close();
      });
    });
  });
//*/

});




//
// insertDocuments() : insert three documents in to "documents"
//                     collection (created if it does not exist)
//
const insertDocuments = function(db, callback) {
  // Using the "documents" collection
  const collection = db.collection('documents');
  // Insert some documents
  collection.insertMany([
    {"fname":"Alondra","lname":"Dunne","email":"alondra.dunne@purplemail.ie","mobile":"0849937354","DoB":"1998-05-02"},
    {"fname":"Iarlaith","lname":"Kelly","email":"iarlaith.kelly@fuchsiamail.ie","mobile":"0843977120","DoB":"1961-01-11"}, 
    {"fname":"Brigid","lname":"Flynn","email":"brigid.flynn@silvermail.ie","mobile":"0844020733","DoB":"1975-11-05"}
  ], function(err, result) {
    // using the assert module for testing
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    // all good if we get to here
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}

//
// findDocuments() : find documents in the "documents"
//                   collection (assuming it exists)
//
const findDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
      // using the assert module for testing
      assert.equal(err, null);
      // all good if we get to here
      console.log("Found the following records");
      console.log(docs)
      callback(docs);
    });
}

//
// findDocumentsFiltered() : find documents in the "documents"
//                           collection (assuming it exists) using filter
//
const findDocumentsFiltered = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Find some documents - with a filter
    collection.find({'lname': 'Dunne'}).toArray(function(err, docs) {
      // using the assert module for testing
      assert.equal(err, null);
      console.log("Found the following records");
      // all good if we get to here
      console.log(docs);
      callback(docs);
    });
} 

//
// updateDocument() : update documents in the "documents"
//                    collection (assuming it exists)
//
const updateDocument = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Update document where email is "alondra.dunne@purplemail.ie", set to "alondra.dunne@redmail.ie"
    collection.updateOne({email : "alondra.dunne@purplemail.ie" }
      , { $set: { email :  "alondra.dunne@redmail.ie" } }, function(err, result) {
      // using the assert module for testing
      assert.equal(err, null);
      assert.equal(1, result.result.n);
      // all good if we get to here
      console.log("Updated the document: reset email field set to alondra.dunne@redmail.ie");
      callback(result);
    });  
  }

//
// updateDocument() : update documents in the "documents"
//                    collection (assuming it exists)
//
const removeDocument = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Delete document where email is "alondra.dunne@redmail.ie"
    collection.deleteOne({ email : "alondra.dunne@redmail.ie" }, function(err, result) {
      // using the assert module for testing
      assert.equal(err, null);
      assert.equal(1, result.result.n);
      // all good if we get to here      
      console.log("Removed the document with email : 'alondra.dunne@redemail.ie'");
      callback(result);
    });    
}