import express, { Express } from "express";
import router from "./property.network"

const property: Express = express();
property.use('/property', router);

export default property;
