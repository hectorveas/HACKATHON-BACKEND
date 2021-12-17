import express, { Express } from "express";
import router from "./commune.network"

const commune: Express = express();
commune.use('/commune', router);

export default commune;
