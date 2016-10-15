import { join } from "path";

var express = require('express');
var path = require('path');

const app = express();
var __projectRoot = __dirname + '/../../../';

app.use(express.static(__projectRoot));
app.use(express.static(join(__projectRoot +'/node_modules')));
app.use(express.static(join(__projectRoot +'/tools')));

require('./test/test-index.js')(app);

app.get('/*', function (req, res) {
    res.sendFile(join(__projectRoot + '/index.html'));
});

app.listen(3000);