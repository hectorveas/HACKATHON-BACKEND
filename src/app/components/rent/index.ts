import express, { Express } from "express";
import router from "./rent.network"

const rent: Express = express();
rent.use('/rent', router);

export default rent;
