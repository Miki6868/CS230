const { items, rn, PrettyPrintMyData, order } = require('./datagen.js')

const Order = {

    insertOrder: function(dbo, data, callback=function(res) {}) {
        dbo.collection("orders").insertOne(data, function(err, res) {
            if (err) throw err;
            PrettyPrintMyData([data], "Order Inserted")
            callback(res)
        });    
    },

    findOrder: function(dbo, query, title="Order Retrieved", callback=function(res) {}) {
        dbo.collection("orders").find(query).toArray(function(err, result) {
            if (err) throw err;
            PrettyPrintMyData(result, title)
            callback(result)
        });
    },

    updateOrder: function(dbo, query, newdata, callback=function(res) {}) {
        var newvalues = { $set: newdata };
        dbo.collection("orders").updateMany(query, newvalues, function(err, res) {
            if (err) throw err;

            if (res.matchedCount > 0) {
                if (res.modifiedCount > 0) {
                    Order.findOrder(dbo, newdata, "Order Updated")
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

    deleteOrder: function(dbo, query, callback=function(res) {}) {
        dbo.collection("orders").deleteMany(query, function(err, obj) {
            if (err) throw err;
            if (obj.deletedCount > 0) {
                PrettyPrintMyData([query], "Order Deleted!")
            } else {
                console.log("Item not found!")
            }
            callback(obj)
        });
    }
}

module.exports = Order