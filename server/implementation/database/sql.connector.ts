import {DatabaseConnector} from "../../api/database/database.connector";
import {Request, Response} from "express";

export class SQLConnector implements DatabaseConnector {

    private mysql:any;
    private pool:any;

    constructor(private connectionLimit:number,
                private host:string,
                private user:string,
                private password:string,
                private database:string,
                private debug = false) {

        this.mysql = require('mysql');

        this.pool = this.mysql.createPool({
            connectionLimit: connectionLimit,
            host: host,
            user: user,
            password: password,
            database: database,
            debug: debug
        });
    }

    executeQuery(query:string){
        // TODO Implementation for MySQL
    }

    handleRequest(req:Request, res:Response, query:string) {

        this.pool.getConnection(function (err, connection) {

            // TODO Manage if connection is not defined

            if (err) {
                connection.release();
                res.send('Error in connection database');
                res.sendStatus(500);
                return;
            }

            console.log('Connected as id ' + connection.threadId);

            connection.query(query, function (err, rows) {
                connection.release();
                if (!err) {
                    console.log('Running query "' + query + '"');
                    console.log(rows);
                    res.json(rows);
                } else {
                    console.log('Error while executing request: ' + query);
                    console.log(err);
                    res.send(err.errno + ' - ' + err.code);
                    res.sendStatus(500);
                }
            });

            connection.on('error', function (err) {
                console.log(err);
                res.send('Error in connection database');
                res.sendStatus(500);
                return;
            });
        });
    }
}