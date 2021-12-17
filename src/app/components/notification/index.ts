import express, { Express } from "express";
import router from "./notification.network"


const notification: Express = express();
notification.use('/notification', router);

export default notification;
