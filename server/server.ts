import {join} from 'path';
import {IDatabaseConnector} from './api/database/database.connector';
import {SQLiteConnector} from './implementation/database/sqlite.connector';
import {populationQueries} from './database.service';

import * as express from 'express';
import * as bodyParser from 'body-parser';

// Test modules
import {testHelloWorld} from './implementation/test/helloworld.test';
import {testHelloSqlite} from './implementation/test/sqlite.test';

// Functional modules
import {accountModule} from './implementation/account/account.server';

const app: express.Application = express();
const projectRoot = __dirname + '/../../../';

app.use(express.static(projectRoot));
app.use(express.static(join(projectRoot + '/node_modules')));
app.use(express.static(join(projectRoot + '/tools')));
app.use(bodyParser.urlencoded({extended: false}));

const serverPort = 3000;

// TODO Put db information into gitignored external file

const dbFilename = './countable-database.sqlite';
const databaseConnector: IDatabaseConnector = new SQLiteConnector(dbFilename);

populationQueries.forEach(function (query) {
    databaseConnector.executeQuery(query);
});

// Test modules
testHelloWorld(app);
testHelloSqlite(app, databaseConnector);

// Functional modules
accountModule(app, databaseConnector);

app.get('/*', function (req, res) {
    res.sendFile(join(projectRoot + '/index.html'));
});

app.listen(serverPort);
