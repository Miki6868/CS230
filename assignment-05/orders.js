const { users, address, rn, PrettyPrintMyData } = require('./datagen.js')

const Order = {

    insertOrder: function(dbo, data) {
        dbo.collection("orders").insertOne(data, function(err, res) {
        if (err) throw err;
        // console.log("\n**********************")
        // console.log(`*** User Inserted ***`)
        // console.log("**********************")
        PrettyPrintMyData([data], "Order Inserted")
        });    
    },

    retrieveOrder: function(dbo, query, title="Order Retrieved") {
        dbo.collection("orders").find(query).toArray(function(err, result) {
            if (err) throw err;
            PrettyPrintMyData(result, title)
        });
    },

    updateOrder: function(dbo, query, newdata) {
        var newvalues = { $set: newdata };
        dbo.collection("orders").updateMany(query, newvalues, function(err, res) {
            if (err) throw err;

            if (res.matchedCount > 0) {
                if (res.modifiedCount > 0) {
                    Customer.retrieveCustomer(dbo, newdata, "Order Updated")
                } else {
                    console.log("Order Update unsuccesful")
                }
            } else {
                console.log("No such Order found")
            }
        });
    },

    deleteOrder: function(dbo, query) {
        dbo.collection("orders").deleteMany(query, function(err, obj) {
            if (err) throw err;
            console.log(obj)
            if (obj.deletedCount > 0) {
                PrettyPrintMyData([query], "Order Deleted!")
            } else {
                console.log("Order not found!")
            }
        });
    }
}

module.exports = Customer