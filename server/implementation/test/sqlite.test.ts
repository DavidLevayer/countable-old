import {Application, Request, Response} from 'express';
import {IDatabaseConnector, QueryType} from '../../api/database/database.connector';

export function testHelloSqlite(app: Application, connector: IDatabaseConnector) {

    /**
     * Returns the list of table contained by the application database (debug function)
     */
    app.get('/api/test/hellosqlite', function (req: Request, res: Response) {

        console.log('hitting HELLO SQLITE function');
        const query = 'SELECT name FROM sqlite_master WHERE type="table"';
        connector.handleRequest(req, res, query, QueryType.SELECT);
    });
}
