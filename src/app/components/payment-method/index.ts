import express, { Express } from "express";
import router from "./payment-method.network"

const paymentMethod: Express = express();
paymentMethod.use('/payment-method', router);

export default paymentMethod;
