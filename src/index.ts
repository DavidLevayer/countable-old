import {SQLConnector} from "./server/mysql/mysql-index";
import {DatabaseConnector} from "./server/database.connector";

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

var __projectRoot = __dirname + '/../../';

var server_port:number = 3000;
// TODO Put db information into gitignored external file
var db_host:string = "mariadb";
var db_user:string = "root";
var db_password:string = "root";
var db_name:string = "db_countable";

app.use(express.static(__projectRoot + '/'));
app.use(bodyParser.urlencoded({ extended: false }));

var mSQLConnector: DatabaseConnector = new SQLConnector(100, db_host, db_user, db_password, db_name);

require('./server/test/test-index.js')(app, mSQLConnector, db_name);
require('./server/account/account.server.js')(app, mSQLConnector);

app.get('/*', function (req, res) {
    res.sendFile(path.join(__projectRoot + '/index.html'));
});

console.log('Server up and running on http://localhost:3000/');
app.listen(server_port);
