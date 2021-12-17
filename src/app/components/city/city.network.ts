import express, { Request, Response, Router } from "express";
import response from "../../modules/reponse.module";
import controller from "./city.controller";
import { City } from "@models/city.model";


const router: Router = express.Router();

router.get('/all', async (req: Request, res: Response) => {
  try {
    const result: City[] = await controller.getCitys();
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
    const result: City | null = await controller.getCity(id);
    response.success(req, res, result);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});


router.post('/', async (req: Request, res: Response) => {
  const region: City = req.body;
  console.log(region)
  try {
    const result: City = await controller.addCity(region);
    response.success(req, res, result, 201);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});

router.patch('/:id', async (req: Request, res: Response) => {
  const region: Partial<City> = req.body;
  const id: string = req.params['id'];

  try {
    const result: City | null = await controller.updateCity(id, region);
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
    const result: City | null = await controller.deleteCity(id);
    response.success(req, res, result, 200);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});

export default router;