const { users, address, rn, PrettyPrintMyData } = require('./datagen.js')

const Customer = {

    insertCustomer: function(db, data, callback=function(res) {}) {
        db.collection("customers").insertOne(data, function(err, res) {
            if (err) throw err;
            // console.log("\n**********************")
            // console.log(`*** User Inserted ***`)
            // console.log("**********************")
            PrettyPrintMyData([data], "User Inserted")
            callback(res)
        });    
    },

    findCustomer: function(db, query, title="User Retrieved", callback=function(res) {}) {
        db.collection("customers").find(query).toArray(function(err, result) {
            if (err) throw err;
            PrettyPrintMyData(result, title)
            callback(result)
        });
    },

    updateCustomer: function(db, query, newdata, callback = function(res) {}) {
        var newvalues = { $set: newdata };
        db.collection("customers").updateMany(query, newvalues, function(err, res) {
            if (err) throw err;

            if (res.matchedCount > 0) {
                if (res.modifiedCount > 0) {
                    Customer.findCustomer(db, newdata, "User Updated")
                    // PrettyPrintMyData([newdata], "User Updated")
                } else {
                    console.log("update unsuccesful")
                }
            } else {
                console.log("No such user found")
            }
            callback(res)
        });
    },

    deleteCustomer: function(db, query, callback=function(res) {}) {
        db.collection("customers").deleteMany(query, function(err, obj) {
            if (err) throw err;
            if (obj.deletedCount > 0) {
                PrettyPrintMyData([query], "User Deleted!")
            } else {
                console.log("User not found!")
            }
            callback(obj)
        });
    }
}

module.exports = Customer