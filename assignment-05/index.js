// syed47
// 1JMFjW4UWLDMCEhE

const { MongoClient } = require('mongodb');
const { users, address, rn, PrettyPrintMyData } = require('./datagen.js')
const { insertCustomer, retrieveCustomer, updateCustomer, deleteCustomer } = require("./customer.js");
const { insertItem, retrieveItem, updateItem, deleteItem } = require("./items.js");
const datagen = require('./datagen.js');
const { insertOrder, retrieveOrder, updateOrder, deleteOrder } = require('./orders.js');
const url = "mongodb+srv://syed47:1JMFjW4UWLDMCEhE@cluster0.sq3xe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const client = new MongoClient(url, { useUnifiedTopology: true } );

let customersPool = null
let itemsPool = null
let ordersPool = null


client.connect(function(err) {
    if (err) throw err;
    const db = client.db("mydb");

    reloadDataPools(() => {
        customers(db, () => { 
            items(db, ()=>{ 
                orders(db, () => {
                    // client.close()
                    console.log("Done")
                }) 
            }) 
        })
    })
});




function customers(db, callback) {
    const { user_id, firstname, surname, mobile, email } = customersPool[datagen.rn(customersPool.length-1)]
    // for (let i = 0; i < 100; i++) {
    insertCustomer(db, { ...datagen.user(), ...datagen.address() }, function() {
        retrieveCustomer(db, { firstname, mobile, email }, "User Retrieved", function() {
            updateCustomer(db, { firstname, mobile, email }, {
                title: "Dr",
                mobile: "0851234567",
                email: (firstname+surname).toLowerCase()+"@email.com",
                town: "heaven 11"
            }, function() {
                deleteCustomer(db, {
                    title: "Dr",
                    mobile: "0851234567",
                    email: (firstname+surname).toLowerCase()+"@email.com",
                    town: "heaven " + (datagen.rn(99) + 11)
                }, function() {
                    reloadDataPools()
                    callback()
                }) 
            })
        })
    })
}

function items(db, callback) {
    const { item_id, manufacturer, model, price } = itemsPool[datagen.rn(itemsPool.length-1)]
    insertItem(db, { ...datagen.item() } , function() {
        retrieveItem(db, { manufacturer, model, price}, "Item Retrieved", function() {
            updateItem(db, { manufacturer, model, price }, { 
                manufacturer, 
                model, 
                price:(price/2+1) 
            }, function() {
                deleteItem(db, { manufacturer, model, price:(price/2+1) }, function() {
                    reloadDataPools();
                    callback()
                })
            });
        })
    })
}

function orders(db, callback) {
    const user = customersPool[datagen.rn(customersPool.length-1)]
    const p = datagen.rn(4)
    const items = []
    for (let i = 0; i < p; i++) {
        const item = itemsPool[datagen.rn(itemsPool.length-1)];
        // if (items.find(i => i === item) === undefined) {
        //     i--;
        // } else {
        items.push(item)
        // }
    }

    const order = ordersPool[datagen.rn(ordersPool.length-1)]
    insertOrder(db, datagen.order(user, items), () => { 
        retrieveOrder(db, { email: user.email }, "Order Retrieved", () => {
            updateOrder(db, { 
                email: user.email 
            }, {
                order_id: datagen.rn(100000)
            }, () => {
                deleteOrder(db, { 
                    order_id: order.order_id, 
                    email: order.email 
                }, () => {
                    reloadDataPools()
                })
            })
        })
    })

    callback()
}


function reloadDataPools(callback=function() {}) {
    client.connect(async function(err) {
        if (err) throw err;
        const db = client.db("mydb");

        // loading all customers from database to pick one random customer later on
        customersPool = await db.collection("customers").find().toArray()
        itemsPool = await db.collection("items").find().toArray()
        ordersPool = await db.collection("orders").find().toArray()
        // console.log("\n>>> [IGNORE!] Pools Reloaded. \n")
        callback(err)
    });
}


// db.collection("items").insertMany(datagen.item(), function(err, res) {
//     if (err) throw err;
//     console.log("Item Inserted");
//     // db.close();
// });
