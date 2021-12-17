import express, { Request, Response, Router } from "express";
import { Admin } from "@models/admin.model";
import response from "../../modules/reponse.module";
import controller from "./admin.controller";


const router: Router = express.Router();

router.get('/all', async (req: Request, res: Response) => {
  try {
    const result: Array<Admin> = await controller.getAdmins();
    response.success(req, res, result);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  const id: string = req.params.id;

  try {
    const result: Array<Admin> = await controller.getAdmin(id);
    response.success(req, res, result.shift());
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});

router.patch('/:id', async (req: Request, res: Response) => {
  const admin: Partial<Admin> = req.body;
  const id: string = req.params['id'];

  try {
    const result: Admin | null = await controller.updateAdmin(id, admin);
    response.success(req, res, result, 200);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});

export default router;
