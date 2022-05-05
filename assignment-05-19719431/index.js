// syed47
// 1JMFjW4UWLDMCEhE

const { MongoClient } = require('mongodb');
const { users, address, rn, PrettyPrintMyData } = require('./datagen.js')
const { insertCustomer, findCustomer, updateCustomer, deleteCustomer } = require("./customer.js");
const { insertItem, findItem, updateItem, deleteItem } = require("./items.js");
const datagen = require('./datagen.js');
const { insertOrder, findOrder, updateOrder, deleteOrder } = require('./orders.js');
const url = "mongodb+srv://syed47:1JMFjW4UWLDMCEhE@cluster0.sq3xe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const client = new MongoClient(url, { useUnifiedTopology: true } );

let customersPool = null;
let itemsPool = null;
let ordersPool = null;


client.connect(function(err) {
    if (err) throw err;
    const db = client.db("mydb");
    // fillDB(db)
    reloadDataPools(() => {
        customers(db, () => { 
            items(db, () => { 
                orders(db, () => { })
            }) 
        })
    })
});




function customers(db, callback) {
    const { user_id, firstname, surname, mobile, email } = customersPool[datagen.rn(customersPool.length-1)]
    const newCustomer = {
        title: "Dr",
        mobile: "0851234567",
        email: (firstname+surname).toLowerCase()+"@email.com",
        town: "heaven " + (datagen.rn(99) + 11)
    }
    insertCustomer(db, { ...datagen.user(), ...datagen.address() }, function() {
        findCustomer(db, { firstname, mobile, email }, "User Retrieved", function() {
            updateCustomer(db, { firstname, mobile, email }, newCustomer, function() {
                deleteCustomer(db, newCustomer, function() {
                    reloadDataPools()
                    callback()
                }) 
            })
        })
    })
}

function items(db, callback) {
    const { item_id, manufacturer, model, price } = itemsPool[datagen.rn(itemsPool.length-1)]
    const newItem = { manufacturer, model, price:(price/2+1) }
    insertItem(db, { ...datagen.item() } , () => {
        findItem(db, { manufacturer, model, price}, "Item Retrieved", () => {
            updateItem(db, { manufacturer, model, price }, newItem, () => {
                deleteItem(db, { manufacturer, model, price:(price/2+1) }, () => {
                    reloadDataPools();
                    callback()
                })
            });
        })
    })
}

function orders(db, callback) {
    const user = customersPool[datagen.rn(customersPool.length-1)]
    const p = datagen.rn(4)+1
    const items = []
    for (let i = 0; i < p; i++) {
        const item = itemsPool[datagen.rn(itemsPool.length-1)];
        items.push(item)
    }

    const order = ordersPool[datagen.rn(ordersPool.length-1)]
    insertOrder(db, datagen.order(user, items), () => { 
        findOrder(db, { email: user.email }, "Order Retrieved", () => {
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


function fillDB(db) {
    // for (let i = 0; i < 100; i++) {
    //     insertCustomer(db, { ...datagen.user(), ...datagen.address() }, () => {})
    // }
    // db.collection("items").insertMany(datagen.item(), function(err, res) {
    //     if (err) throw err;
    //     console.log("Item Inserted");
    //     // db.close();
    // });

    reloadDataPools(() => {
        for (let i = 0; i < 20; i++) {
            const user = customersPool[datagen.rn(customersPool.length-1)]
            const p = datagen.rn(4)+1
            const items = []
            for (let i = 0; i < p; i++) {
                const item = itemsPool[datagen.rn(itemsPool.length-1)];
                items.push(item)
            }
            insertOrder(db, datagen.order(user, items), () => {})
        }
    })
}




/*

Assignment 5
Syed Baryalay
19719431

Developed using Macos, Node.js 16.14.2

node_modules need to be installed before running. ("npm instal")
To test the application, run "node index.js".

It performs all the CRUD activities for the 3 collections, and prints output to 
the console.

I recommened running the application more than once to see different number of
purchases and orders.


My database design is partially normalized, it store the user_id and item_id on each 
order and each purchase as a unique purchase_id.
I also store the name and email of user in the order table.
I did this so query orders and purchases user matching email.


The program works exactly as required. Any issues let me know.

*/