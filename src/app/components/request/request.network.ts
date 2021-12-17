import express, { Request, Response, Router } from "express";
import response from "../../modules/reponse.module";
import controller from "./request.controller";
import { RequestI } from "@models/request.model";


const router: Router = express.Router();

router.get('/all', async (req: Request, res: Response) => {
  try {
    const result: RequestI[] = await controller.getRequests();
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
    const result: RequestI[] = await controller.getRequestsByState(state);
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
    const result: RequestI | null = await controller.getRequest(id);
    response.success(req, res, result);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});

router.post('/', async (req: Request, res: Response) => {
  const request: RequestI = req.body;

  try {
    const result: RequestI | null = await controller.addRequest(request);
    response.success(req, res, result, 201);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});

router.patch('/:id', async (req: Request, res: Response) => {
  const request: Partial<RequestI> = req.body;
  const id: string = req.params['id'];

  try {
    const result: RequestI | null = await controller.updateRequest(id, request);
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
    const result: RequestI | null = await controller.deleteRequest(id);
    response.success(req, res, result, 200);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});

export default router;