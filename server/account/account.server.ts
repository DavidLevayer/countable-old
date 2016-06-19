import {Application} from "express";
import {DatabaseConnector} from "../database.connector";



module.exports = function (app:Application, connector:DatabaseConnector) {
    
    /**
     * Return a list of all accounts
     */
    app.get('/api/account/', function (req, res) {
        var query = 'SELECT * FROM Account;';
        connector.handleRequest(req, res, query);
    });

    /**
     * Add a new account
     */
    app.post('/api/account/new', function (req, res) {

        var name:string = req.body.name;

        if (name != null && name.length > 0) {
            var query = 'INSERT INTO Account VALUES (' + name + ');';
            connector.handleRequest(req, res, query);
        }
    });

    /**
     * Delete an account a list of all accounts
     */
    app.delete('/api/account/delete', function (req, res) {

        var id:string = req.body.id;

        if (name != null && name.length > 0) {
            var query = 'DELETE FROM Account WHERE account_id = ' + id + ';';
            connector.handleRequest(req, res, query);
        }
    });
};