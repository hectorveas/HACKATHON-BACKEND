import express, { Express } from "express";
import router from "./about-us.network"

const aboutUs: Express = express();
aboutUs.use('/aboutUs', router);

export default aboutUs;
