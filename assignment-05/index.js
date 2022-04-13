// syed47
// 1JMFjW4UWLDMCEhE

const { MongoClient } = require('mongodb');
const { users, address, rn, PrettyPrintMyData } = require('./datagen.js')
const { insertCustomer, retrieveCustomer, updateCustomer, deleteCustomer } = require("./customer.js");
const { insertItem, retrieveItem, updateItem, deleteItem } = require("./items.js");
const datagen = require('./datagen.js');
const url = "mongodb+srv://syed47:1JMFjW4UWLDMCEhE@cluster0.sq3xe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
let customersPool = null
let itemsPool = null
let ordersPool = null

reloadDataPools()

setTimeout(function() {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        const dbo = db.db("mydb");


        // customers(dbo)
        items(dbo)


        // db.close()
        reloadDataPools()
    });
}, 2000)



function customers(dbo) {
    const { user_id, firstname, surname, mobile, email } = customersPool[datagen.rn(customersPool.length-1)]
    // for (let i = 0; i < 100; i++)
        insertCustomer(dbo, { ...datagen.user(), ...datagen.address() })

    retrieveCustomer(dbo, { firstname, mobile, email })

    updateCustomer(dbo, { firstname, mobile, email }, {
        title: "Dr",
        mobile: "0851234567",
        email: firstname+surname+"@email.com",
        town: "heaven 11"
    })

    deleteCustomer(dbo, {
        title: "Dr",
        mobile: "0851234567",
        email: firstname+surname+"@email.com",
        town: "heaven 11"
    })
}

function items(dbo) {
    const { item_id, manufacturer, model, price } = itemsPool[datagen.rn(itemsPool.length-1)]
    insertItem(dbo, { ...datagen.item() } )
    retrieveItem(dbo, { manufacturer, model, price} )
    updateItem(dbo, { manufacturer, model, price }, { manufacturer, model, price:(price/2+1) });
    deleteItem(dbo, { manufacturer, model, price:(price/2+1) })
}

function orders() {
    const { firstname, surname, mobile, email } = customersPool[datagen.rn(customersPool.length-1)]
    const { manufacturer, model, price } = itemsPool[datagen.rn(itemsPool.length-1)]

}


function reloadDataPools() {
    MongoClient.connect(url, async function(err, db) {
        if (err) throw err;
        // loading all customers from database to pick one random customer later on
        customersPool = await db.db("mydb").collection("customers").find().toArray()
        itemsPool = await db.db("mydb").collection("items").find().toArray()
        ordersPool = await db.db("mydb").collection("orders").find().toArray()
        console.log("\n>>>Pools Reloaded\n")
    });
}


// dbo.collection("items").insertMany(datagen.item(), function(err, res) {
//     if (err) throw err;
//     console.log("Item Inserted");
//     // db.close();
// });
