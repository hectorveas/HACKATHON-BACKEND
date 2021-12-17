import express, { Express } from "express";
import router from "./payment.network"


const payment: Express = express();
payment.use('/payment', router);

export default payment;
