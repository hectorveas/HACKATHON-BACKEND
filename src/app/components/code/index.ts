import express, { Express } from "express";
import router from "./code.network"


const code: Express = express();
code.use('/code', router);

export default code;
