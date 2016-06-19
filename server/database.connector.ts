import {Request} from "express";
import {Response} from "express";

export interface DatabaseConnector {
    
    handleRequest(req: Request, res: Response, query: string);
}