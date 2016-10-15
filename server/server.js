"use strict";
var path_1 = require("path");
var express = require('express');
var path = require('path');
var app = express();
var __projectRoot = __dirname;
app.use(express.static(path_1.join(__projectRoot + '/node_modules')));
app.use(express.static(path_1.join(__projectRoot + '/tools')));
require('./test/test-index.js')(app);
app.get('/*', function (req, res) {
    res.sendFile(path_1.join(__projectRoot + '/../index.html'));
});
app.listen(3000);
//# sourceMappingURL=server.js.map