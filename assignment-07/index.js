const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const cors = require('cors')
// const db = require('./db.js')

const { MongoClient } = require('mongodb');
const { address, rn, PrettyPrintMyData, user, item, order } = require('./datagen.js')
const { insertCustomer, findCustomer, updateCustomer, deleteCustomer } = require("./customer.js");
const { insertItem, findItem, updateItem, deleteItem } = require("./items.js");
const { insertOrder, findOrder, updateOrder, deleteOrder } = require("./orders.js");

const datagen = require('./datagen.js');
const uri = "mongodb+srv://syed47:1JMFjW4UWLDMCEhE@cluster0.sq3xe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

// MIDDLEWARES
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', express.static('public'))
app.use(cors());

const DataPool = {
    users: [], 
    items: [], 
    orders:[]
}



MongoClient.connect(uri, { useUnifiedTopology: true }).then((client) => {

    const customers = client.db("ca7").collection("customers");
    const items = client.db("ca7").collection("items");
    const orders = client.db("ca7").collection("orders");
    

    // CUSTOMERS CRUD
    app.put('/C_Customer', (req, res) => {
        // console.log(req.body)
        const user = { ...req.body }
        console.log("user",user)
        insertCustomer(customers, user, (dbres, customer) => {
            console.log("before response")
            res.json({ status_code: 200, customer })
        })
    })

    app.post('/R_Customer', (req, res) => {
        const { customer } = req.body;
        console.log(customer)
        findCustomer(customers, { firstname: customer.firstname }, "User Retrieved", (dbres, customer) => {
            res.json({ status_code: 200, customer: dbres })
        })
    });
    
    app.post('/U_Customer', (req, res) => {
        console.log(req.body.customer)
        const { firstname, surname, mobile, email } = req.body.customer;
        const newCustomer = {
            title: "Dr",
            mobile: "0851234567",
            email: (firstname+surname).toLowerCase()+"@email.com",
            town: "heaven " + (datagen.rn(99) + 11)
        }
        updateCustomer(customers, { firstname, mobile, email }, newCustomer, (dbres, customer) => {
            findCustomer(customers, newCustomer, "User Retrieved", (dbres, customer) => {
                res.json({status_code: 200, customer: dbres})
            })
        })
    });
    
    app.delete('/D_Customer', (req, res) => {
        const query = req.body;
        deleteCustomer(customers, query, (dbres, customer) =>{
            res.json({...dbres, ...customer})
        })
    })
    





    // ITEMS CRUD
    app.put('/C_Item', (req, res) => {
        insertItem(items, { ...datagen.item() } , (dbres, item) => {
            res.json(item)
        })
    })

    app.get('/R_Item', (req, res) => {
        const { manufacturer, model, price } = req.body
        findItem(items, { manufacturer, model, price }, "Item Retrieved", (dbres, item) => {
            res.json(dbres)
        })
    });
    
    app.post('/U_Item', (req, res) => {
        const { manufacturer, model, price } = req.body
        const newItem = { manufacturer, model, price:(price/2+1) }
        updateItem(items, { manufacturer, model, price }, newItem, (dbres, item) => {
            findItem(items, newItem, "Item Retrieved", (dbres, item) => {
                res.json(dbres)
            })
        })
    });
    
    app.delete('/D_Item', (req, res) => {
        const { manufacturer, model, price } = req.body
        deleteItem(items, { manufacturer, model, price }, (dbres, item) =>{
            res.json({...dbres, ...item})
        })
    })
    





    // ORDERS CRUD
    app.put('/C_Order', (req, res) => {
        UPDATE_CACHE( (data) => {
            const { user, items } = randomOrder(data)
            console.log(user)
            console.log(items)
            insertOrder(orders, datagen.order(user, items), (dbres, order) => {
                res.json({user, items})
            })
        })
    })

    app.get('/R_Order', (req, res) => {
        UPDATE_CACHE((_) => {
            const { email } = req.body
            console.log(user)
            findOrder(orders, { email }, "Order Retrieved", (dbres, order) => {
                console.log(order)
                res.json(dbres)
            })
        })
    });
    
    app.post('/U_Order', (req, res) => {
        UPDATE_CACHE((_) => {
            const { email } = req.body
            updateOrder(orders, 
                { email }, 
                { order_id: datagen.rn(100000) }, (dbres, order) => {
                UPDATE_CACHE((data) => {
                    const { email } = req.body
                    console.log(user)
                    findOrder(orders, { email }, "Order Retrieved", (dbres, order) => {
                        console.log(order)
                        res.json(dbres)
                    })
                })
            })
        })
    });
    
    app.delete('/D_Order', (req, res) => {
        UPDATE_CACHE((data) => {
            const { order_id, email } = req.body
            deleteOrder(orders, { order_id, email }, (dbres, order) => {
                res.json({...dbres, ...order})
            })
        })

    })


    app.listen(3000, () => {
        console.log('server listening on 3000')
    })


    async function UPDATE_CACHE(callback=function() {}) {
        // loading all customers from database to pick one random customer later on
        DataPool.users = await client.db("ca7").collection("customers").find().toArray()
        DataPool.items = await client.db("ca7").collection("items").find().toArray()
        DataPool.orders = await client.db("ca7").collection("orders").find().toArray()
        console.log("\n>>> [IGNORE!] Pools Reloaded. \n")
        callback(DataPool)
    }


    function randomOrder(data) {
        // console.log(data)
        const user = data.users[datagen.rn(data.users.length-1)]
        const p = datagen.rn(4)+1
        const items = []
        for (let i = 0; i < p; i++) {
            const item = data.items[datagen.rn(data.items.length-1)];
            items.push(item)
        }

        return { user, items }
    }

})

