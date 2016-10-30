import { join } from "path";
import { DatabaseConnector } from "./api/database/database.connector";
import {SQLiteConnector} from "./implementation/database/sqlite.connector";
import {populationQueries} from "./database.service";

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

const app = express();
var __projectRoot = __dirname + '/../../../';

app.use(express.static(__projectRoot));
app.use(express.static(join(__projectRoot +'/node_modules')));
app.use(express.static(join(__projectRoot +'/tools')));
app.use(bodyParser.urlencoded({ extended: false }));

var server_port:number = 3000;

// TODO Put db information into gitignored external file

/*var db_host:string = "localhost";
var db_user:string = "root";
var db_password:string = "root";
var db_name:string = "db_countable";

var mSQLConnector: DatabaseConnector = new SQLConnector(100, db_host, db_user, db_password, db_name);*/

var db_filename:string = "./countable-database.sqlite";
var databaseConnector: DatabaseConnector = new SQLiteConnector(db_filename);

populationQueries.forEach(function(query){
    databaseConnector.executeQuery(query);
});

// Test modules
require('./implementation/test/helloworld.test.js')(app);
require('./implementation/test/sqlite.test.js')(app, databaseConnector);

// Account module
require('./implementation/account/account.server.js')(app, databaseConnector);

app.get('/*', function (req, res) {
    res.sendFile(join(__projectRoot + '/index.html'));
});

app.listen(server_port);