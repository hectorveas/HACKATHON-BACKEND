import express, { Express } from "express";
import router from "./content.network"

const content: Express = express();
content.use('/content', router);

export default content;
