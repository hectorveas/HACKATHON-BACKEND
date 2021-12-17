import express, { Request, Response, Router } from "express";
import response from "../../modules/reponse.module";
import controller from "./location.controller";
import { Location } from "@models/location.model";


const router: Router = express.Router();

router.get('/all', async (req: Request, res: Response) => {
  try {
    const result: Location[] = await controller.getLocations();
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
    const result: Location | null = await controller.getLocation(id);
    response.success(req, res, result);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});


router.post('/', async (req: Request, res: Response) => {
  const location: Location = req.body;
  try {
    const result: Location = await controller.addLocation(location);
    response.success(req, res, result, 201);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});

router.post('/rent/:id', async (req: Request, res: Response) => {
  const location: Location = req.body;
  const id: string = req.params['id'];

  try {
    const result: Location = await controller.addRentLocation(location, id);
    response.success(req, res, result, 201);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});

router.patch('/:id', async (req: Request, res: Response) => {
  const location: Partial<Location> = req.body;
  const id: string = req.params['id'];

  try {
    const result: Location | null = await controller.updateLocation(id, location);
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
    const result: Location | null = await controller.deleteLocation(id);
    response.success(req, res, result, 200);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});

export default router;