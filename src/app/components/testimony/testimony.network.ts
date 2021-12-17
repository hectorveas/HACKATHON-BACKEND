import express, { Request, Response, Router } from "express";
import response from "../../modules/reponse.module";
import controller from "./testimony.controller";
import { Testimony } from "@models/testimony.model";


const router: Router = express.Router();

router.get('/all', async (req: Request, res: Response) => {
  try {
    const result: Testimony[] = await controller.getTestimonies();
    response.success(req, res, result);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  const id: string = req.params['id'];

  try {
    const result: Testimony | null = await controller.getTestimony(id);
    response.success(req, res, result);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});

router.post('/', async (req: Request, res: Response) => {
  const plan: Testimony = req.body;
  
  try {
    const result: Testimony = await controller.addTestimony(plan);
    response.success(req, res, result, 201);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});

router.patch('/:id', async (req: Request, res: Response) => {
  const plan: Partial<Testimony> = req.body;
  const id: string = req.params['id'];

  try {
    const result: Testimony | null = await controller.updateTestimony(id, plan);
    response.success(req, res, result, 200);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  const id: string = req.params['id'];

  try {
    const result: Testimony | null = await controller.deleteTestimony(id);
    response.success(req, res, result, 200);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});

export default router;