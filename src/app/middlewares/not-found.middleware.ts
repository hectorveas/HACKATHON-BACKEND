import response from "../modules/reponse.module";
import { Request, Response } from "express";

export default function notFound(req: Request, res: Response){
  if(req.baseUrl === ''){
    response.success(req, res, 'API working')
  }
  else {
    response.error(req, res, 'Not Found', 404);
  }
}
