const { items, rn, PrettyPrintMyData } = require('./datagen.js')

const Item = {

    insertItem: function(dbo, data, callback=function(res) {}) {
        dbo.collection("items").insertOne(data, function(err, res) {
            if (err) throw err;
            PrettyPrintMyData([data], "Item Inserted")
            callback(res)
        });    
    },

    findItem: function(dbo, query, title="Item(s) Retrieved", callback=function(res) {}) {
        dbo.collection("items").find(query).toArray(function(err, result) {
            if (err) throw err;
            PrettyPrintMyData(result, title)
            callback(result)
        });
    },

    updateItem: function(dbo, query, newdata, callback=function(res) {}) {
        var newvalues = { $set: newdata };
        dbo.collection("items").updateMany(query, newvalues, function(err, res) {
            if (err) throw err;

            if (res.matchedCount > 0) {
                if (res.modifiedCount > 0) {
                    Item.findItem(dbo, newdata, "Item(s) Updated")
                    // callback(res)
                } else {
                    console.log("update unsuccesful")
                }
            } else {
                console.log("No such Item found")
            }
            callback(res)
        });
    },

    deleteItem: function(dbo, query, callback=function(res) {}) {
        dbo.collection("items").deleteMany(query, function(err, obj) {
            if (err) throw err;
            if (obj.deletedCount > 0) {
                PrettyPrintMyData([query], "Item(s) Deleted!")
            } else {
                console.log("Item not found!")
            }
            callback(obj)
        });
    }
}

module.exports = Item