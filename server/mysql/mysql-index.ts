import {DatabaseConnector} from "../database.connector";

export class SQLConnector implements DatabaseConnector{

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

    handleRequest(req, res, query) {

        this.pool.getConnection(function (err, connection) {
            if (err) {
                connection.release();
                res.json({"code": 100, "status": "Error in connection database"});
                return;
            }

            console.log('Connected as id ' + connection.threadId);
            console.log('Running query "' + query + '"');

            connection.query(query, function (err, rows) {
                connection.release();
                if (!err) {
                    res.json(rows);
                }
            });

            connection.on('error', function (err) {
                res.json({"code": 100, "status": "Error in connection database"});
                return;
            });
        });
    }
}