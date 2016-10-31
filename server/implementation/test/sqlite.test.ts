module.exports = function(app, connector) {

    /**
     * Returns the list of table contained by the application database (debug function)
     */
    app.get('/api/test/hellosqlite', function (req, res) {

        console.log('hitting HELLO SQLITE function');
        var query = 'SELECT name FROM sqlite_master WHERE type="table"';
        connector.handleRequest(req, res, query);
    });
};