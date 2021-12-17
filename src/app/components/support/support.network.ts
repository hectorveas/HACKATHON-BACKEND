import express, { Request, Response, Router } from "express";
import response from "../../modules/reponse.module";
import controller from "./support.controller";
import { Support } from "@models/support.model";


const router: Router = express.Router();

router.get('/all', async (req: Request, res: Response) => {
  try {
    const result: Support[] = await controller.getSupports();
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
    const result: Support[] = await controller.getSupportsByState(state);
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
    const result: Support | null = await controller.getSupport(id);
    response.success(req, res, result);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});

router.post('/', async (req: Request, res: Response) => {
  const support: Support = req.body;

  try {
    const result: Support | null = await controller.addSupport(support);
    response.success(req, res, result, 201);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});

router.post('/user/:id', async (req: Request, res: Response) => {
  const support: Support = req.body;
  const id: string = req.params['id'];

  try {
    const result: Support | null = await controller.addUserSupport(support, id);
    response.success(req, res, result, 201);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});

router.patch('/:id', async (req: Request, res: Response) => {
  const support: Partial<Support> = req.body;
  const id: string = req.params['id'];

  try {
    const result: Support | null = await controller.updateSupport(id, support);
    response.success(req, res, result, 200);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});
router.patch('/:id/messages', async (req: Request, res: Response) => {
  const messages: { messages: string[] }= req.body;
  const id: string = req.params['id'];

  try {
    await controller.updateMessagesSupport(id, messages);
    response.success(req, res, 'Message has been updated', 200);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  const id: string = req.params['id'];

  try {
    const result: Support | null = await controller.deleteSupport(id);
    response.success(req, res, result, 200);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});

export default router;