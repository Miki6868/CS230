const { users, address, rn, PrettyPrintMyData } = require('./datagen.js')

const Customer = {

    insertCustomer: function(dbo, data) {
        dbo.collection("customers").insertOne(data, function(err, res) {
        if (err) throw err;
        // console.log("\n**********************")
        // console.log(`*** User Inserted ***`)
        // console.log("**********************")
        PrettyPrintMyData([data], "User Inserted")
        });    
    },

    retrieveCustomer: function(dbo, query, title="User Retrieved") {
        dbo.collection("customers").find(query).toArray(function(err, result) {
            if (err) throw err;
            PrettyPrintMyData(result, title)
        });
    },

    updateCustomer: function(dbo, query, newdata, callback = function(res) {}) {
        var newvalues = { $set: newdata };
        dbo.collection("customers").updateMany(query, newvalues, function(err, res) {
            if (err) throw err;

            if (res.matchedCount > 0) {
                if (res.modifiedCount > 0) {
                    Customer.retrieveCustomer(dbo, newdata, "User Updated")
                } else {
                    console.log("update unsuccesful")
                }
            } else {
                console.log("No such user found")
            }
        });
    },

    deleteCustomer: function(dbo, query) {
        dbo.collection("customers").deleteMany(query, function(err, obj) {
            if (err) throw err;
            if (obj.deletedCount > 0) {
                PrettyPrintMyData([query], "User Deleted!")
            } else {
                console.log("User not found!")
            }
        });
    }
}

module.exports = Customer