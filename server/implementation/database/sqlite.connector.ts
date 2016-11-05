import {IDatabaseConnector, QueryType} from '../../api/database/database.connector';
import {Request, Response} from 'express';
import {Database} from 'sqlite3';

export class SQLiteConnector implements IDatabaseConnector {

    private db: Database;

    constructor(private databaseFilename: string) {
        const sqlite = require('sqlite3').verbose();
        this.db = new sqlite.Database(databaseFilename);
    }

    public executeQuery(query: string) {

        // TODO Manage if db is undefined

        this.db.all(query, function (err, rows) {

            if (!err) {
                console.log('Running query "' + query + '"');
                console.log(rows);
            } else {
                console.error('Error while executing request: ' + query);
                console.error(err);
            }
        });
    }

    public handleRequest(req: Request, res: Response, query: string, queryType: QueryType) {

        // TODO Manage if db is undefined

        const callback = function (err, rows) {

            if (!err) {
                console.log('Running query "' + query + '"');

                // Retrieve the ID of the last inserted row
                if (typeof rows === 'undefined' && typeof this.lastID !== 'undefined') {
                    rows = {'insertId': this.lastID};
                }

                console.log(rows);
                res.json(rows);
            } else {
                console.error('Error while executing request: ' + query);
                console.error(err);
                res.send(err.name + ' - ' + err.message);
                res.sendStatus(500);
            }
        };

        if (queryType === QueryType.SELECT) {
            this.db.all(query, callback);
        } else {
            this.db.run(query, callback);
        }
    }
}
