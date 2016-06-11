
module.exports = function(app, connection, db_name) {

    /**
     * Returns "hello world" (debug function)
     */
    app.get('/helloworld', function (req, res) {
        console.log('hitting HELLO WORLD function');
        var welcomeString = '<h1>hello world!</h1>';
        res.end(welcomeString);
    });

    /**
     * Returns the list of table contained by the application database (debug function)
     */
    app.get('/hellomysql', function (req, res) {

        console.log('hitting HELLO MYSQL function');
        var query = 'SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE ="BASE TABLE" AND TABLE_SCHEMA="' + db_name + '";';
        var result:string = 'no result';

        connection.query(query, function (err, rows, fields) {
            if (!err) {
                res.json(rows);
            }
            else {
                console.log(err);
                res.end('Error while performing Query.');
            }
        });
    });
}