import {Request} from "express";
import {Response} from "express";

export interface IDatabaseConnector {

    executeQuery(query: string);
    handleRequest(req: Request, res: Response, query: string, queryType: QueryType);
}

export enum QueryType {

    SELECT, INSERT, UPDATE, DELETE
}
