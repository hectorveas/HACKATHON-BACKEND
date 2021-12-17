import express, { Express } from "express";
import router from "./profile-picture-verification.network"

const profilePictureVerification: Express = express();
profilePictureVerification.use('/profile-picture-verification', router);

export default profilePictureVerification;
