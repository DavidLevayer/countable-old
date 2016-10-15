import { join } from "path";
import { DatabaseConnector } from "./api/database/database.connector";
import { SQLConnector } from "./implementation/database/sql.connector";

var express = require('express');
var path = require('path');

const app = express();
var __projectRoot = __dirname + '/../../../';

app.use(express.static(__projectRoot));
app.use(express.static(join(__projectRoot +'/node_modules')));
app.use(express.static(join(__projectRoot +'/tools')));

var server_port:number = 3000;

// TODO Put db information into gitignored external file
var db_host:string = "localhost";
var db_user:string = "root";
var db_password:string = "root";
var db_name:string = "db_countable";

var mSQLConnector: DatabaseConnector = new SQLConnector(100, db_host, db_user, db_password, db_name);

require('./test/test-index.js')(app, mSQLConnector, db_name);

app.get('/*', function (req, res) {
    res.sendFile(join(__projectRoot + '/index.html'));
});

app.listen(server_port);