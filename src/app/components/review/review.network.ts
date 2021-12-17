import express, { Request, Response, Router } from "express";
import response from "../../modules/reponse.module";
import controller from "./review.controller";
import { Review } from "@models/review.model";


const router: Router = express.Router();

router.get('/all', async (req: Request, res: Response) => {
  try {
    const result: Review[] = await controller.getReviews();
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
    const result: Review | null = await controller.getReview(id);
    response.success(req, res, result);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});

router.post('/', async (req: Request, res: Response) => {
  const review: Review = req.body;
  
  try {
    const result: Review = await controller.addReview(review);
    response.success(req, res, result, 201);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});

router.post('/property/:id', async (req: Request, res: Response) => {
  const review: Review = req.body;
  const id: string = req.params['id'];

  try {
    const result: Review = await controller.addPropertyReview(review, id);
    response.success(req, res, result, 201);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});

router.post('/user/:id', async (req: Request, res: Response) => {
  const review: Review = req.body;
  const id: string = req.params['id'];

  try {
    const result: Review = await controller.addUserReview(review, id);
    response.success(req, res, result, 201);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});

router.patch('/:id', async (req: Request, res: Response) => {
  const review: Partial<Review> = req.body;
  const id: string = req.params['id'];

  try {
    const result: Review | null = await controller.updateReview(id, review);
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
    const result: Review | null = await controller.deleteReview(id);
    response.success(req, res, result, 200);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});

export default router;