import express, { Request, Response, Router } from "express";
import response from "../../modules/reponse.module";
import controller from "./payment.controller";
import { Payment } from "@models/payment.model";
import payment from "../../modules/payment.module";
import { v4 as uuidv4 } from 'uuid';




const router: Router = express.Router();

router.get('/all', async (req: Request, res: Response) => {
  try {
    const result: Array<Payment> = await controller.getPayments();
    response.success(req, res, result);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});
router.get('/status', async (req: Request, res: Response) => {
  
  const token: any = req.query["token"]
  
  try {
    const result: any = await payment.getStatus(token);
    response.success(req, res, result, 201);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  const id: string = req.params['id'];

  try {
    const result: Payment | null = await controller.getPayment(id);
    response.success(req, res, result);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});



router.post('/', async (req: Request, res: Response) => {
  const payment: Payment = req.body;

  try {
    const result: Payment = await controller.addPayment(payment);
    response.success(req, res, result, 201);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});
router.post('/create', async (req: Request, res: Response) => {
  if(req.body.amount >= 350){
    var uuid = uuidv4();
    uuid = uuid.substring(0,8);

    const paramsPost: any = { 
      "commerceOrder": uuid,
      "subject": req.body.subject,
      "currency": "CLP",
      "amount": req.body.amount,
      "email": req.body.email,
      "paymentMethod": req.body.paymentMethod,
      "urlConfirmation": process.env.FLOW_BASEURL + "/payment_confirm",
      "urlReturn": process.env.FLOW_BASEURL + "/result",
    }
    try {
      const result: any = await payment.generatePaymentOrder(paramsPost);
      response.success(req, res, result, 200);
    }
    catch (error) {
      console.error(error);
      response.error(req, res, 'Invalid information', 500);
    }
  
  }else{response.error(req,res,"Bad request",401)}
  
  });
router.post('/createEmail', async (req: Request, res: Response) => {
if(req.body.amount >= 350){
  var uuid = uuidv4();
  uuid = uuid.substring(0,8);

  const paramsPost: any = { 
    "commerceOrder": uuid,
    "subject": req.body.subject,
    "currency": "CLP",
    "amount": req.body.amount,
    "email": req.body.email,
    "paymentMethod": req.body.paymentMethod,
    "urlConfirmation": process.env.FLOW_BASEURL + "/payment_confirm",
    "urlReturn": process.env.FLOW_BASEURL + "/result",
  }
  
  try {
    const result:any= await payment.generatePaymentEmail(paramsPost);
    response.success(req, res, result, 201);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
}else{response.error(req,res,"Bad request",401)}
});

router.patch('/:id', async (req: Request, res: Response) => {
  const payment: Partial<Payment> = req.body;
  const id: string = req.params['id'];

  try {
    const result: Payment | null = await controller.updatePayment(id, payment);
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
    const result: Payment | null = await controller.deletePayment(id);
    response.success(req, res, result, 200);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});

export default router;