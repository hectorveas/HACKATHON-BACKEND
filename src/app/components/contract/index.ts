import express, { Express } from "express";
import router from "./contract.network"


const contract: Express = express();
contract.use('/contract', router);

export default contract;
