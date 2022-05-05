const { users, address, rn, PrettyPrintMyData } = require('./datagen.js')

const Customer = {

    insertCustomer: function(collection, data, callback=function(res, customer) {}) {
       collection.insertOne(data, function(err, res) {
            if (err) throw err;
            PrettyPrintMyData([data], "User Inserted")
            callback(res, data)
        });    
    },

    findCustomer: function(collection, query, title="User Retrieved", callback=function(res, customer) {}) {
       collection.find(query).toArray(function(err, result) {
            if (err) throw err;
            PrettyPrintMyData(result, title)
            callback(result, query)
        });
    },

    updateCustomer: function(collection, query, newdata, callback = function(res, customer) {}) {
        var newvalues = { $set: newdata };
       collection.updateMany(query, newvalues, function(err, obj) {
            if (err) throw err;

            if (obj.matchedCount > 0) {
                if (obj.modifiedCount > 0) {
                    Customer.findCustomer(collection, newdata, "User Updated")
                } else {
                    console.log("update unsuccesful")
                }
            } else {
                console.log("No such user found")
            }
            callback(obj, query)
        });
    },

    deleteCustomer: function(collection, query, callback=function(res, customer) {}) {
       collection.deleteMany(query, function(err, obj) {
            if (err) throw err;
            if (obj.deletedCount > 0) {
                PrettyPrintMyData([query], "User Deleted!")
            } else {
                console.log("User not found!")
            }
            callback(obj, query)
        });
    }
}

module.exports = Customer