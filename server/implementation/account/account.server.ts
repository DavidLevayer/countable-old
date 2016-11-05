import {Application, Request, Response} from 'express';
import {IDatabaseConnector, QueryType} from '../../api/database/database.connector';

export function accountModule(app: Application, connector: IDatabaseConnector) {

    const KEY_ID = 'id';
    const KEY_BODY = 'body';

    /**
     * Return a list of all accounts
     */
    app.get('/api/account/', function (req: Request, res: Response) {
        const query = 'SELECT * FROM Account;';
        connector.handleRequest(req, res, query, QueryType.SELECT);
    });

    /**
     * Get a specific account
     */
    app.get('/api/account/:id', function (req: Request, res: Response) {

        // TODO Test undefined ID

        const query = 'SELECT * FROM Account WHERE accountId = ' + req.params[KEY_ID] + ';';
        connector.handleRequest(req, res, query, QueryType.SELECT);
    });

    /**
     * Add a new account
     */
    app.post('/api/account/', function (req: Request, res: Response) {

        const name: string = req[KEY_BODY].name;

        // TODO Test undefined name

        if (name != null && name.length > 0) {
            const query = 'INSERT INTO Account (name) VALUES ("' + name + '");';
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
    app.put('/api/account/:id', function (req: Request, res: Response) {

        // TODO Test undefined ID / name

        const id: string = req.params[KEY_ID];
        const name: string = req[KEY_BODY].name;

        if (id != null && id.length > 0 && name != null && name.length > 0) {
            const query = 'UPDATE Account SET name = "' + name + '" WHERE accountId = ' + id + ';';
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
    app.delete('/api/account/:id', function (req: Request, res: Response) {

        const id: string = req.params[KEY_ID];

        // TODO Test undefined ID

        if (id != null && id.length > 0) {
            const query = 'DELETE FROM Account WHERE accountId = ' + id + ';';
            connector.handleRequest(req, res, query, QueryType.DELETE);
        } else {
            res.send('Missing parameter');
            res.sendStatus(400);
            return;
        }
    });
};
