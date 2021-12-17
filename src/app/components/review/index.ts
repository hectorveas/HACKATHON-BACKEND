import express, { Express } from "express";
import router from "./review.network"

const review: Express = express();
review.use('/review', router);

export default review;
