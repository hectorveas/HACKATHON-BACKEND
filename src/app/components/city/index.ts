import express, { Express } from "express";
import router from "./city.network"

const city: Express = express();
city.use('/city', router);

export default city;
