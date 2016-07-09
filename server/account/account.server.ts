import {Application, Request, Response} from "express";
import {DatabaseConnector} from "../database.connector";

module.exports = function (app:Application, connector:DatabaseConnector) {

    /**
     * Return a list of all accounts
     */
    app.get('/api/account/', function (req:Request, res:Response) {
        var query = 'SELECT * FROM Account;';
        connector.handleRequest(req, res, query);
    });

    /**
     * Get a specific account
     */
    app.get('/api/account/:id', function (req:Request, res:Response) {
        var query = 'SELECT * FROM Account WHERE account_id = ' + req.param('id') + ';';
        connector.handleRequest(req, res, query);
    });

    /**
     * Add a new account
     */
    app.post('/api/account/', function (req, res) {

        var name:string = req.body.name;

        if (name != null && name.length > 0) {
            var query = 'INSERT INTO Account (name) VALUES ("' + name + '");';
            connector.handleRequest(req, res, query);
        } else {
            res.send(400, 'Missing parameter');
            return;
        }
    });

    /**
     * Edit an account
     */
    app.put('/api/account/:id', function (req:Request, res:Response) {

        var id:string = req.param('id');
        var name:string = req.body.name;

        if (id != null && id.length > 0 && name != null && name.length > 0) {
            var query = 'UPDATE Account SET name = "' + name + '" WHERE account_id = "' + id + '";';
            connector.handleRequest(req, res, query);
        } else {
            res.send(400, 'Missing parameter');
            return;
        }
    });

    /**
     * Delete an account
     */
    app.delete('/api/account/:id', function (req:Request, res:Response) {

        var id:string = req.param('id');

        if (id != null && id.length > 0) {
            var query = 'DELETE FROM Account WHERE account_id = ' + id + ';';
            connector.handleRequest(req, res, query);
        } else {
            res.send(400, 'Missing parameter');
            return;
        }
    });
};