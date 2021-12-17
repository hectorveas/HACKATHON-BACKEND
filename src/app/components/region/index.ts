import express, { Express } from "express";
import router from "./region.network"


const region: Express = express();
region.use('/region', router);

export default region;
