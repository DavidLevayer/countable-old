import {Application, Request, Response} from 'express';
import {IDatabaseConnector, QueryType} from '../../api/database/database.connector';

export function subcategoryModule(app: Application, connector: IDatabaseConnector) {

    const KEY_ID = 'id';
    const KEY_BODY = 'body';

    /**
     * Return a list of all categories
     */
    app.get('/api/subcategory/', function (req: Request, res: Response) {
        const query = 'SELECT * FROM Subcategory;';
        connector.handleRequest(req, res, query, QueryType.SELECT);
    });
}
