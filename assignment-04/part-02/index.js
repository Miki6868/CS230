// import mysql and http packages
const mysql = require('mysql');
const http = require('http')

// database connection
const con = mysql.createConnection({
    host: "*****",
    user: "********",
    password: "*************",
    database: "********"
});
// http response headers
let headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS, GET, POST,PUT, DELETE",
    "Access-Control-Max-Age": 2592000, // 30 days
    "Content-Type": "text/html",
};

http.createServer(function (req, res) {
    if (req.url === '/create' && req.method == 'POST'){
        let body = '';
        req.on('data', data => {
            // reading and appending request stream data in variable 'body'
            body += data;
        });
        // when the request stream is done reading, this function is called
        req.on('end', () => {
            const packet = JSON.parse(body); // converting from JSON to object
            console.log(packet)
            const { user } = packet,  { address } = packet
            // SQL INSERT queries
            const query_user = `INSERT INTO user_records (title, firstname, surname, mobile, email) 
            VALUES ("${user.title}", "${user.firstname}", "${user.surname}","${user.mobile}","${user.email}");`
            const query_address = `INSERT INTO address_records (physical, shipping, city, eircode) 
            VALUES ("${address.physical}", "${address.shipping}", "${address.city}", "${address.eircode}");`
            let status_code = 200, response = null;
            // executing the queries
            con.query(query_user, function (err, result, fields) {
                if (err) {
                    status_code = 500
                    console.log(err)
                }
                response = result;
                console.log(response)
            });
            con.query(query_address, function (err, result, fields) {
                if (err) {
                    status_code = 500
                    console.log(err)
                }
                response = result;
                console.log(response)

                // responding back to the client
                res.writeHead(status_code, headers);
                res.end(JSON.stringify({ status_code, data: packet }));
            });

        });
    } else if (req.url === '/retrieve' && req.method == 'POST') {
        let body = '';
        req.on('data', data => {
            body += data;
        });
        req.on('end', () => {
            const packet = JSON.parse(body);
            console.log(packet)
            const { firstname } = packet;
            const query_user = `SELECT * FROM user_records 
            JOIN address_records ON user_records.id = address_records.customer_id
            WHERE firstname = "${firstname}";`
            let status_code = 200, response = null;
            con.query(query_user, function (err, result, fields) {
                if (err) {
                    status_code = 500
                    console.log(err)
                }
                response = result;
                console.log(response)

                // responding back to the client
                res.writeHead(status_code, headers);
                res.end(JSON.stringify({ status_code, data: response }));
            });

        });
    } else if (req.url === '/update' && req.method == 'POST') {
        let body = '';
        req.on('data', data => {
            body += data;
        });
        req.on('end', () => {
            const packet = JSON.parse(body);
            console.log(packet)
            const { id, title, mobile, email, city } = packet;   
            // SQL Update query to upddate user data     
            const query_user = `UPDATE user_records
                SET title = "${title}", 
                mobile = "${mobile}",
                email = "${email}"
                WHERE id = "${id}";`
            // SQL Update query to upddate address data     
            const query_address = `UPDATE address_records
                SET city = "${city}"
                WHERE customer_id = "${id}";`
            
            let status_code = 200, response = null;
            con.query(query_user, function (err, result, fields) {
                if (err) {
                    status_code = 500
                    console.log(err)
                }
                response = result;
                console.log(response)
            });
            con.query(query_address, function (err, result, fields) {
                if (err) {
                    status_code = 500
                    console.log(err)
                }
                response = result;
                console.log(response)
            });

            // quering the database to check whether the user is updated
            const check_query = `SELECT * FROM user_records 
            JOIN address_records ON user_records.id = address_records.customer_id
            WHERE id = "${id}";`
            con.query(check_query, function (err, result, fields) {
                if (err) {
                    status_code = 500
                    console.log(err)
                }
                response = result;
                console.log(response)

                // responding back to the client with the queried data
                res.writeHead(status_code, headers);
                res.end(JSON.stringify({ status_code, data: response }));
            });
        });
    } else if (req.url === '/delete' && req.method == 'POST') {
        let body = '';
        req.on('data', data => {
            body += data;
        });
        req.on('end', () => {
            const packet = JSON.parse(body);
            console.log(packet)
            const { firstname, mobile, email } = packet;
            // SQL Select query, works on JOIN table
            const check_query = `SELECT * FROM user_records 
            JOIN address_records ON user_records.id = address_records.customer_id
            WHERE firstname = "${firstname}"
            AND mobile = "${mobile}"
            AND email = "${email}";`
            // executing the query
            con.query(check_query, function (err, result, fields) {
                if (err) {
                    status_code = 500
                    console.log(err)
                }
                response = result;
                console.log(response)
                // res.writeHead(status_code, headers);
                // res.end(JSON.stringify({ status_code, data: response }));
            });
            // SQL delete query to delete the user data
            const query_user = `DELETE ad, u FROM address_records ad 
                JOIN user_records u
                ON ad.customer_id = u.id
                WHERE firstname = "${firstname}"
                AND mobile = "${mobile}"
                AND email  = "${email}"`;
            let status_code = 200, response = null;
            con.query(query_user, function (err, result, fields) {
                if (err) {
                    status_code = 500
                    console.log(err)
                }

                // responding back to the client with same data
                if (result.affectedRows > 0) {
                    res.writeHead(status_code, headers);
                    res.end(JSON.stringify({ status_code, data: response}));
                } else {
                    res.writeHead(status_code, headers);
                    res.end(JSON.stringify({ status_code, data: false }));
                }

            });

        });
    }
    // starting server on port 3000
}).listen(3000, () => {
    console.log("Server running on PORT "+ 3000)
});
