import {Application, Request, Response} from "express";
import {DatabaseConnector, QueryType} from "../../api/database/database.connector";

module.exports = function (app:Application, connector:DatabaseConnector) {

    /**
     * Return a list of all accounts
     */
    app.get('/api/account/', function (req:Request, res:Response) {
        var query = 'SELECT * FROM Account;';
        connector.handleRequest(req, res, query, QueryType.SELECT);
    });

    /**
     * Get a specific account
     */
    app.get('/api/account/:id', function (req:Request, res:Response) {

        // TODO Test undefined ID

        var query = 'SELECT * FROM Account WHERE account_id = ' + req.params['id'] + ';';
        connector.handleRequest(req, res, query, QueryType.SELECT);
    });

    /**
     * Add a new account
     */
    app.post('/api/account/', function (req:Request, res:Response) {

        var name:string = req['body'].name;

        // TODO Test undefined name

        if (name != null && name.length > 0) {
            var query = 'INSERT INTO Account (name) VALUES ("' + name + '");';
            connector.handleRequest(req, res, query, QueryType.INSERT);
        } else {
            res.send('Missing parameter');
            res.sendStatus(400);
            return;
        }
    });

    /**
     * Edit an account
     */
    app.put('/api/account/:id', function (req:Request, res:Response) {

        // TODO Test undefined ID / name

        var id:string = req.params['id'];
        var name:string = req['body'].name;

        if (id != null && id.length > 0 && name != null && name.length > 0) {
            var query = 'UPDATE Account SET name = "' + name + '" WHERE account_id = "' + id + '";';
            connector.handleRequest(req, res, query, QueryType.UPDATE);
        } else {
            res.send('Missing parameter');
            res.sendStatus(400);
            return;
        }
    });

    /**
     * Delete an account
     */
    app.delete('/api/account/:id', function (req:Request, res:Response) {

        var id:string = req.params['id'];

        // TODO Test undefined ID

        if (id != null && id.length > 0) {
            var query = 'DELETE FROM Account WHERE account_id = ' + id + ';';
            connector.handleRequest(req, res, query, QueryType.DELETE);
        } else {
            res.send('Missing parameter');
            res.sendStatus(400);
            return;
        }
    });
};