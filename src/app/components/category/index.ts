import express, { Express } from "express";
import router from "./category.network"

const category: Express = express();
category.use('/category', router);

export default category;
