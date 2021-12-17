import express, { Request, Response, Router } from "express";
import response from "../../modules/reponse.module";
import controller from "./consultation.controller";
import { Consultation } from "@models/consultation.model";
import { Answer } from "@models/consultation.model"

const router: Router = express.Router();

router.get('/all', async (req: Request, res: Response) => {
  try {
    const result: Consultation[] = await controller.getConsultations();
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
    const result: Consultation | null = await controller.getConsultation(id);
    response.success(req, res, result);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});

router.post('/', async (req: Request, res: Response) => {
  const consultation: Consultation = req.body;
  
  try {
    const result: Consultation = await controller.addConsultation(consultation);
    response.success(req, res, result, 201);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});

router.post('/:id/answer', async (req: Request, res: Response) => {
  const id: string = req.params['id'];
  const answer: Answer = {
    user: req.body.user,
    content: req.body.content,
    date: new Date()
  };
  try {
    const result: any = await controller.addAnswer(id, answer);
    response.success(req, res, result, 201);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
})

router.post('/property/:id', async (req: Request, res: Response) => {
  const consultation: Consultation = req.body;
  const id: string = req.params['id'];
  
  try {
    const result: Consultation = await controller.addPropertyConsultation(consultation, id);
    response.success(req, res, result, 201);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});

router.post('/user/:id', async (req: Request, res: Response) => {
  const consultation: Consultation = req.body;
  const id: string = req.params['id'];
  
  try {
    const result: Consultation = await controller.addUserConsultation(consultation, id);
    response.success(req, res, result, 201);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});

router.patch('/:id', async (req: Request, res: Response) => {
  const consultation: Partial<Consultation> = req.body;
  const id: string = req.params['id'];

  try {
    const result: Consultation | null = await controller.updateConsultation(id, consultation);
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
    const result: Consultation | null = await controller.deleteConsultation(id);
    response.success(req, res, result, 200);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});

export default router;