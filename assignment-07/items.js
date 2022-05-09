const { items, rn, PrettyPrintMyData } = require('./datagen.js')

const Item = {

    insertItem: function(collection, data, callback=function(res, item) {}) {
        collection.insertOne(data, function(err, res) {
            if (err) throw err;
            PrettyPrintMyData([data], "Item Inserted")
            callback(res, data)
        });    
    },

    findItem: function(collection, query, title="Item(s) Retrieved", callback=function(res, item) {}) {
        collection.find(query).toArray(function(err, result) {
            if (err) throw err;
            PrettyPrintMyData(result, title)
            callback(result, query)
        });
    },

    updateItem: function(collection, query, newdata, callback=function(res, item) {}) {
        var newvalues = { $set: newdata };
        collection.updateMany(query, newvalues, function(err, res) {
            if (err) throw err;

            if (res.matchedCount > 0) {
                if (res.modifiedCount > 0) {
                    Item.findItem(collection, newdata, "Item(s) Updated")
                    // callback(res)
                } else {
                    console.log("update unsuccesful")
                }
            } else {
                console.log("No such Item found")
            }
            callback(res, query)
        });
    },

    deleteItem: function(collection, query, callback=function(res, item) {}) {
        collection.deleteMany(query, function(err, obj) {
            if (err) throw err;
            if (obj.deletedCount > 0) {
                PrettyPrintMyData([query], "Item(s) Deleted!")
            } else {
                console.log("Item not found!")
            }
            callback(obj, query)
        });
    }
}

module.exports = Item