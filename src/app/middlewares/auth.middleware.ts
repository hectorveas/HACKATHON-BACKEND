import { Request, Response } from "express";
import authModule from "../modules/auth.module";
import response from "../modules/reponse.module";

function auth(entity: string) {
    return (req: Request, res: Response, next: any) => {
        try {
            authModule.checkAuth(req, entity);
            next();
        } catch (error) {
            response.error(req, res, `The request doesn't have the token header or you don't have the correct credentials`);
        }
    }
}

export default auth;
