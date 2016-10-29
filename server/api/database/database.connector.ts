import {Request} from "express";
import {Response} from "express";

export interface DatabaseConnector {

    executeQuery(query: string);
    handleRequest(req: Request, res: Response, query: string);
}