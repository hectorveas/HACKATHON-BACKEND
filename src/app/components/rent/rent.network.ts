import express, { Request, Response, Router } from "express";
import response from "../../modules/reponse.module";
import controller from "./rent.controller";
import { Rent } from "@models/rent.model";


const router: Router = express.Router();

router.get('/all', async (req: Request, res: Response) => {
  try {
    const result: Rent[] = await controller.getRents();
    response.success(req, res, result);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});

router.get('/:state/all', async (req: Request, res: Response) => {
  const state: string = req.params['state'];

  try {
    const result: Rent[] = await controller.getRentsByState(state);
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
    const result: Rent | null = await controller.getRent(id);
    response.success(req, res, result);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});

router.post('/', async (req: Request, res: Response) => {
  const rent: Rent = req.body;
  
  try {
    const result: Rent = await controller.addRent(rent);
    response.success(req, res, result, 201);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});

router.post('/user/:id', async (req: Request, res: Response) => {
  const rent: Rent = req.body;
  const id: string = req.params['id'];

  try {
    const result: Rent = await controller.addUserRent(rent, id);
    response.success(req, res, result, 201);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});

router.patch('/:id', async (req: Request, res: Response) => {
  const rent: Partial<Rent> = req.body;
  const id: string = req.params['id'];

  try {
    const result: Rent | null = await controller.updateRent(id, rent);
    response.success(req, res, result, 200);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});

router.patch('/:id/code', async (req: Request, res: Response) => {
  const code : { code: string }  = req.body;
  const id: string = req.params['id'];
  try {
    await controller.updateCodeRent(id, code);
    response.success(req, res, 'Code has been updated', 200);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});
router.patch('/:id/contract', async (req: Request, res: Response) => {
  const contract : { contract: string }  = req.body;
  const id: string = req.params['id'];
  try {
    await controller.updateContractRent(id, contract);
    response.success(req, res, 'Contract has been updated', 200);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});
router.delete('/:id', async (req: Request, res: Response) => {
  const id: string = req.params['id'];

  try {
    const result: Rent | null = await controller.deleteRent(id);
    response.success(req, res, result, 200);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});

export default router;