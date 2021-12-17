import express, { Express } from "express";
import router from "./contact.network"


const contact: Express = express();
contact.use('/contact', router);

export default contact;
