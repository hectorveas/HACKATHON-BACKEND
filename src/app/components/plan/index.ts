import express, { Express } from "express";
import router from "./plan.network"

const plan: Express = express();
plan.use('/plan', router);

export default plan;
