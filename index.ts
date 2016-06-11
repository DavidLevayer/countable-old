var express = require('express');
var app = express();

var mysql = require('mysql');

var server_port:number = 3000;
// TODO Put db information into gitignored external file
var db_host:string = "localhost";
var db_user:string = "root";
var db_password:string = "root";
var db_name:string = "db_countable";

var connection = mysql.createConnection({
    host: db_host,
    user: db_user,
    password: db_password,
    database: db_name
});

connection.connect(function (err) {
    if (!err) {
        console.log("Connected to database [" + db_name + "]");
    } else {
        console.log("[ERROR] connecting database...");
    }
});

require('./server/test/test-index.js')(app, connection, db_name);

console.log('Server up and running on http://localhost:3000/');
app.listen(server_port);
