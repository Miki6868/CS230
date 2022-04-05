// importing sql package
const mysql = require('mysql');
// for reading command line inputs
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

// database connection
const con = mysql.createConnection({
    host: "*****",
    user: "********",
    password: "*************",
    database: "********"
});

// import random data generator of this program
const data = require('./datagen');

// reading command from user
readline.question('Command: ', cmd => {
    // cmd = cmd.toUpperCase();
    cmd = cmd.split(" ") // spliting command into tokens
    const action = cmd[0].toUpperCase()
    if (action === "CREATE") {
        con.connect(function(err) { // querying database
            if (err) throw err;

            const user = data.user()
            const address = data.address()
            const query_user = `INSERT INTO user_records (title, firstname, surname, mobile, email) 
            VALUES ("${user.title}", "${user.firstname}", "${user.surname}","${user.mobile}","${user.email}");`
            const query_address = `INSERT INTO address_records (physical, shipping, city, eircode) 
            VALUES ("${address.physical}", "${address.shipping}", "${address.city}", "${address.eircode}");`
            // executing the above SQL insert queries
            con.query(query_user, function (err, result, fields) {
                if (err) console.log(err)
                console.log(result)
            });
            con.query(query_address, function (err, result, fields) {
                if (err) console.log(err)
                console.log(result) // printing the result
            });
            con.end()
        });
    } else if (action === "RETRIEVE" && cmd.length == 2) {
        con.connect(function(err) {
            if (err) throw err;
            const query_user = `SELECT * FROM user_records 
            JOIN address_records ON user_records.id = address_records.customer_id
            WHERE firstname = "${cmd[1]}";`
            // executing the above SQL select queries
            con.query(query_user, function (err, result, fields) {
                if (err) console.log(err)
                console.log(result) // printing the result
            });
            con.end()
        })
    } else if (action === "UPDATE" && cmd.length === 6) {
        console.log(action)
        con.connect(function(err) {
            if (err) throw err;
 
            const query_user = `UPDATE user_records
            SET title = "${cmd[2]}", 
            mobile = "${cmd[3]}",
            email = "${cmd[4]}"
            WHERE id = "${cmd[1]}";`

            const query_address = `UPDATE address_records
            SET city = "${cmd[5]}"
            WHERE customer_id = "${cmd[1]}";`

            // executing the above SQL Update Queries
            con.query(query_user, function (err, result, fields) {
                if (err) console.log(err)
                console.log(result)
            });
            con.query(query_address, function (err, result, fields) {
                if (err) console.log(err)
                console.log(result)
            });
            con.end()
        })
    } else if (action === "DELETE" && cmd.length === 4) {
        console.log(action)
        con.connect(function(err) {
            if (err) throw err;
            
            const query_user = `DELETE ad, u FROM address_records ad 
                JOIN user_records u
                ON ad.customer_id = u.id
                WHERE firstname = "${cmd[1]}"
                AND mobile = "${cmd[2]}"
                AND email  = "${cmd[3]}"`;
            // executing the above SQL delete queries
            con.query(query_user, function (err, result, fields) {
                if (err) console.log(err)
                console.log(result)
            });
            con.end()
        })
    } else {
        console.log("Invalid command. Run index.js again.")
    }
    readline.close();
});

