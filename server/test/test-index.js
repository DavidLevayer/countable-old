module.exports = function (app) {
    /**
     * Returns "hello world" (debug function)
     */
    app.get('/api/test/helloworld', function (req, res) {
        console.log('hitting HELLO WORLD function');
        var welcomeString = '<h1>hello world!</h1>';
        res.end(welcomeString);
    });
};
//# sourceMappingURL=test-index.js.map