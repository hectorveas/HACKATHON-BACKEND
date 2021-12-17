import express, { Request, Response, Router } from "express";
import { User } from "@models/user.model";
import response from "../../modules/reponse.module";
import controller from "./auth.controller";
import { Admin } from "@models/admin.model";
import { Auth } from "@models/auth.model";
import auth from "../../modules/sendGrid.module"


const router: Router = express.Router();

router.post('/user/signin', async (req: Request, res: Response) => {
  const auth: Auth & User = req.body;

  try {
    const result: Auth = await controller.userSignIn(auth);
    response.success(req, res, result, 200);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 400);
  }
});

router.post('/admin/signin', async (req: Request, res: Response) => {
  const auth: Auth & Admin = req.body;
  
  try {
    const result: Auth = await controller.adminSignIn(auth);
    response.success(req, res, result, 201);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});

router.post('/login', async (req: Request, res: Response) => {
  const auth: Auth = req.body;

  try {
    const result: Auth | null = await controller.login(auth);
    response.success(req, res, result, 200);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 400);
  }
});
router.post('/mail/send/', async (req: Request, res: Response) => {
  const msg: any = {
    to: req.body.to,
    from: 'noreply@codefire.cl', // Use the email address or domain you verified above
    subject: req.body.subject,
    text: req.body.text,
  };

  try {
    const result: any = await auth.sendMail(msg);
    response.success(req, res, result, 200);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 400);
  }
});


export default router;
