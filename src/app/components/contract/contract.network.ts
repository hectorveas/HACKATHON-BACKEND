import express, { Request, Response, Router } from "express";
import response from "../../modules/reponse.module";
import controller from "./contract.controller";
import { Contract } from "@models/contract.model";


const router: Router = express.Router();

router.get('/all', async (req: Request, res: Response) => {
  try {
    const result: Array<Contract> = await controller.getContracts();
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
    const result: Contract | null = await controller.getContract(id);
    response.success(req, res, result);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});

router.post('/', async (req: Request, res: Response) => {
  const contract: Contract = req.body;

  try {
    const result: Contract = await controller.addContract(contract);
    response.success(req, res, result, 201);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});

router.post('/rent/:id', async (req: Request, res: Response) => {
  const contract: Contract = req.body;
  const id: string = req.params['id'];

  try {
    const result: Contract = await controller.addRentContract(contract, id);
    response.success(req, res, result, 201);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});

router.patch('/:id', async (req: Request, res: Response) => {
  const contract: Partial<Contract> = req.body;
  const id: string = req.params['id'];

  try {
    const result: Contract | null = await controller.updateContract(id, contract);
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
    const result: Contract | null = await controller.deleteContract(id);
    response.success(req, res, result, 200);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});

export default router;