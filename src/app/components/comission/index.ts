import express, { Express } from "express";
import router from "./comission.network"

const comission: Express = express();
comission.use('/comission', router);

export default comission;
