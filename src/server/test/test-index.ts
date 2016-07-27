
module.exports = function(app, connector, db_name) {

    /**
     * Returns "hello world" (debug function)
     */
    app.get('/api/test/helloworld', function (req, res) {
        console.log('hitting HELLO WORLD function');
        var welcomeString = '<h1>hello world!</h1>';
        res.end(welcomeString);
    });

    /**
     * Returns the list of table contained by the application database (debug function)
     */
    app.get('/api/test/hellomysql', function (req, res) {

        console.log('hitting HELLO MYSQL function');
        var query = 'SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE ="BASE TABLE" AND TABLE_SCHEMA="' + db_name + '";';
        connector.handleRequest(req, res, query);
    });
};