import express, { Express } from "express";
import router from "./location.network"


const location: Express = express();
location.use('/location', router);

export default location;
