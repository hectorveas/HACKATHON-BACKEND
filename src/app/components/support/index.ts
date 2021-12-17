import express, { Express } from "express";
import router from "./support.network"


const support: Express = express();
support.use('/support', router);

export default support;
