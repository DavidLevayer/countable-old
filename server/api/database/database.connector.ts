import {Request} from 'express';
import {Response} from 'express';

export interface IDatabaseConnector {

    executeQuery(query: string): void;
    handleRequest(req: Request, res: Response, query: string, queryType: QueryType): void;
}

export enum QueryType {

    SELECT, INSERT, UPDATE, DELETE
}
