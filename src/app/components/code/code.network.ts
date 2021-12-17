import express, { Request, Response, Router } from "express";
import response from "../../modules/reponse.module";
import controller from "./code.controller";
import { Code } from "@models/code.model";


const router: Router = express.Router();

router.get('/all', async (req: Request, res: Response) => {
  try {
    const result: Array<Code> = await controller.getCodes();
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
    const result: Code | null = await controller.getCode(id);
    response.success(req, res, result);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});

router.post('/', async (req: Request, res: Response) => {
  const code: Code = req.body;

  try {
    const result: Code = await controller.addCode(code);
    response.success(req, res, result, 201);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});

router.post('/rent/:id', async (req: Request, res: Response) => {
  const code: Code = req.body;
  const id: string = req.params['id'];

  try {
    const result: Code = await controller.addRentCode(code, id);
    response.success(req, res, result, 201);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});

router.patch('/:id', async (req: Request, res: Response) => {
  const code: Partial<Code> = req.body;
  const id: string = req.params['id'];

  try {
    const result: Code | null = await controller.updateCode(id, code);
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
    const result: Code | null = await controller.deleteCode(id);
    response.success(req, res, result, 200);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});

export default router;