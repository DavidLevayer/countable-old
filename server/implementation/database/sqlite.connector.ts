import {DatabaseConnector} from "../../api/database/database.connector";
import {Request, Response} from "express";
import {Database} from "sqlite3";

export class SQLiteConnector implements DatabaseConnector {

    private sqlite3:any;
    private db:Database;

    constructor(private databaseFilename:string) {

        var sqlite3 = require('sqlite3').verbose();
        this.db = new Database(databaseFilename);
    }

    executeQuery(query:string){

        // TODO Manage if db is undefined

        this.db.all(query, function (err, rows) {

            if (!err) {
                console.log('Running query "' + query + '"');
                console.log(rows);
            } else {
                console.log('Error while executing request: ' + query);
                console.log(err);
            }
        });
    }

    handleRequest(req:Request, res:Response, query:string) {

        // TODO Manage if db is undefined

        this.db.all(query, function (err, rows) {

            if (!err) {
                console.log('Running query "' + query + '"');
                console.log(rows);
                res.json(rows);
            } else {
                console.log('Error while executing request: ' + query);
                console.log(err);
                res.send(err.name + ' - ' + err.message);
                res.sendStatus(500);
            }
        });
    }
}