import express, { Express } from "express";
import router from "./message.network"

const message: Express = express();
message.use('/message', router);

export default message;
