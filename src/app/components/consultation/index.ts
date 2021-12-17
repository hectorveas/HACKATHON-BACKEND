import express, { Express } from "express";
import router from "./consultation.network"

const consultation: Express = express();
consultation.use('/consultation', router);

export default consultation;
