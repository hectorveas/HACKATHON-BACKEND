import express, { Request, Response, Router } from "express";
import response from "../../modules/reponse.module";
import controller from "./commune.controller";
import { Commune } from "@models/commune.model";


const router: Router = express.Router();

router.get('/all', async (req: Request, res: Response) => {
  try {
    const result: Commune[] = await controller.getCommunes();
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
    const result: Commune | null = await controller.getCommune(id);
    response.success(req, res, result);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});


router.post('/', async (req: Request, res: Response) => {
  const region: Commune = req.body;
  console.log(region)
  try {
    const result: Commune = await controller.addCommune(region);
    response.success(req, res, result, 201);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});

router.patch('/:id', async (req: Request, res: Response) => {
  const region: Partial<Commune> = req.body;
  const id: string = req.params['id'];

  try {
    const result: Commune | null = await controller.updateCommune(id, region);
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
    const result: Commune | null = await controller.deleteCommune(id);
    response.success(req, res, result, 200);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});

export default router;