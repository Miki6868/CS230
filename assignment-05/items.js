const { items, rn, PrettyPrintMyData } = require('./datagen.js')

const Item = {

    insertItem: function(dbo, data) {
        dbo.collection("items").insertOne(data, function(err, res) {
        if (err) throw err;
        // console.log("\n**********************")
        // console.log(`*** Item Inserted ***`)
        // console.log("**********************")
        PrettyPrintMyData([data], "User Inserted")
        });    
    },

    retrieveItem: function(dbo, query, title="Item Retrieved") {
        dbo.collection("items").find(query).toArray(function(err, result) {
            if (err) throw err;
            PrettyPrintMyData(result, title)
        });
    },

    updateItem: function(dbo, query, newdata) {
        var newvalues = { $set: newdata };
        dbo.collection("items").updateMany(query, newvalues, function(err, res) {
            if (err) throw err;

            if (res.matchedCount > 0) {
                if (res.modifiedCount > 0) {
                    Item.retrieveItem(dbo, newdata, "Item Updated")
                } else {
                    console.log("update unsuccesful")
                }
            } else {
                console.log("No such Item found")
            }
        });
    },

    deleteItem: function(dbo, query) {
        dbo.collection("items").deleteMany(query, function(err, obj) {
            if (err) throw err;
            console.log(obj)
            if (obj.deletedCount > 0) {
                PrettyPrintMyData([query], "Item Deleted!")
            } else {
                console.log("Item not found!")
            }
        });
    }
}

module.exports = Item