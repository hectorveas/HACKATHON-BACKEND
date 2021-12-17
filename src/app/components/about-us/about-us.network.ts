import express, { Request, Response, Router } from "express";
import response from "../../modules/reponse.module";
import controller from "./about-us.controller";
import { AboutUs } from "@models/about-us.model";


const router: Router = express.Router();

router.get('/all', async (req: Request, res: Response) => {
  try {
    const result: AboutUs[] = await controller.getAboutUss();
    response.success(req, res, result);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});

router.get('/:type/all', async (req: Request, res: Response) => {
  const type: string = req.params['type'];

  try {
    const result: AboutUs[] = await controller.getContentByType(type);
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
    const result: AboutUs | null = await controller.getAboutUs(id);
    response.success(req, res, result);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});

router.post('/', async (req: Request, res: Response) => {
  const aboutUs: AboutUs = req.body;
  
  try {
    const result: AboutUs = await controller.addAboutUs(aboutUs);
    response.success(req, res, result, 201);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});

router.patch('/:id', async (req: Request, res: Response) => {
  const aboutUs: Partial<AboutUs> = req.body;
  const id: string = req.params['id'];

  try {
    const result: AboutUs | null = await controller.updateAboutUs(id, aboutUs);
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
    const result: AboutUs | null = await controller.deleteAboutUs(id);
    response.success(req, res, result, 200);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});

export default router;