import express, { Request, Response, Router } from "express";
import response from "../../modules/reponse.module";
import controller from "./payment-method.controller";
import { PaymentMethod } from "@models/payment-method.model";


const router: Router = express.Router();

router.get('/all', async (req: Request, res: Response) => {
  try {
    const result: PaymentMethod[] = await controller.getPaymentMethods();
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
    const result: PaymentMethod | null = await controller.getPaymentMethod(id);
    response.success(req, res, result);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});

router.post('/', async (req: Request, res: Response) => {
  const paymentMethod: PaymentMethod = req.body;
  
  try {
    const result: PaymentMethod = await controller.addPaymentMethod(paymentMethod);
    response.success(req, res, result, 201);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});

router.post('/user/:id', async (req: Request, res: Response) => {
  const paymentMethod: PaymentMethod = req.body;
  const id: string = req.params['id'];
  
  try {
    const result: PaymentMethod = await controller.addUserPaymentMethod(paymentMethod, id);
    response.success(req, res, result, 201);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});

router.patch('/:id', async (req: Request, res: Response) => {
  const paymentMethod: Partial<PaymentMethod> = req.body;
  const id: string = req.params['id'];

  try {
    const result: PaymentMethod | null = await controller.updatePaymentMethod(id, paymentMethod);
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
    const result: PaymentMethod | null = await controller.deletePaymentMethod(id);
    response.success(req, res, result, 200);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});

export default router;