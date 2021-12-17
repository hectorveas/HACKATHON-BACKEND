import express, { Express } from "express";
import router from "./service.network"

const service: Express = express();
service.use('/service', router);

export default service;
