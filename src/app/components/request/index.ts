import express, { Express } from "express";
import router from "./request.network"


const request: Express = express();
request.use('/request', router);

export default request;
