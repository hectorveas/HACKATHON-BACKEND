import express, { Express } from "express";
import router from "./notification-type.network"

const notificationType: Express = express();
notificationType.use('/notification-type', router);

export default notificationType;
