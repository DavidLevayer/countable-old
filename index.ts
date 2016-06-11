var express = require('express');
var app = express();

app.get('/helloworld', function (req, res) {
    var welcomeString = '<h1>hello world!</h1>';
    res.end(welcomeString);
});

console.log('Server up and running on http://localhost:3000/');
app.listen(3000);
