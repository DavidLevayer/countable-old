import {DatabaseConnector} from "../database.connector";
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

    handleRequest(req:Request, res:Response, query:string) {

        this.pool.getConnection(function (err, connection) {
            if (err) {
                connection.release();
                res.send(500, 'Error in connection database');
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
                    res.send(500, err.errno + ' - ' + err.code);
                }
            });

            connection.on('error', function (err) {
                console.log(err);
                res.send(500, 'Error in connection database');
                return;
            });
        });
    }
}