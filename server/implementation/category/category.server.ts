import {Application, Request, Response} from 'express';
import {IDatabaseConnector, QueryType} from '../../api/database/database.connector';

export function categoryModule(app: Application, connector: IDatabaseConnector) {

    const KEY_ID = 'id';
    const KEY_BODY = 'body';

    /**
     * Return a list of all categories
     */
    app.get('/api/category/', function (req: Request, res: Response) {
        const query = 'SELECT * FROM Category;';
        connector.handleRequest(req, res, query, QueryType.SELECT);
    });
}
