import express, { Express } from "express";
import router from "./term.network"

const term: Express = express();
term.use('/term', router);

export default term;
