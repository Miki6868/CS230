const { items, rn, PrettyPrintMyData, order } = require('./datagen.js')

const Order = {

    insertOrder: function(collection, data, callback=function(res, order) {}) {
        collection.insertOne(data, function(err, res) {
            if (err) throw err;
            PrettyPrintMyData([data], "Order Inserted")
            callback(res, data)
        });    
    },

    findOrder: function(collection, query, title="Order Retrieved", callback=function(res, order) {}) {
        collection.find(query).toArray(function(err, result) {
            if (err) throw err;
            PrettyPrintMyData(result, title)
            callback(result, query)
        });
    },

    updateOrder: function(collection, query, newdata, callback=function(res, order) {}) {
        var newvalues = { $set: newdata };
        collection.updateMany(query, newvalues, function(err, res) {
            if (err) throw err;

            if (res.matchedCount > 0) {
                if (res.modifiedCount > 0) {
                    Order.findOrder(collection, newdata, "Order Updated")
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

    deleteOrder: function(collection, query, callback=function(res, order) {}) {
        collection.deleteMany(query, function(err, obj) {
            if (err) throw err;
            if (obj.deletedCount > 0) {
                PrettyPrintMyData([query], "Order Deleted!")
            } else {
                console.log("Item not found!")
            }
            callback(obj, query)
        });
    }
}

module.exports = Order