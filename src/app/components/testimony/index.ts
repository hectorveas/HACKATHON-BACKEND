import express, { Express } from "express";
import router from "./testimony.network"

const testimony: Express = express();
testimony.use('/testimony', router);

export default testimony;
