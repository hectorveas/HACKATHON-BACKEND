import express, { Request, Response, Router } from "express";
import response from "../../modules/reponse.module";
import controller from "./property.controller";
import { Property } from "@models/property.model";
import multer from "multer";
import storage from '../../modules/storage.module'
import { S3Collection } from '../../enums/s3-collections.enum';

const multerMemoryStorage = multer.memoryStorage();
const multerUploadInMemory = multer({
  storage: multerMemoryStorage
});

const router: Router = express.Router();

router.get('/all', async (req: Request, res: Response) => {
  const property: any = {
    lat: req.query.lat,
    lng: req.query.lng
  }
  
  try {
    const limit: number = Number(req.query.limit) || 5;
    const page: number = Number(req.query.page) || 1;
    const result: Property[] = await controller.getProperties(property,limit, page);
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
    const limit: number = Number(req.query.limit) || 5;
    const page: number = Number(req.query.page) || 1;
    const result: Property[] = await controller.getPropertiesByType(type, limit, page);
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
    const result: Property | null = await controller.getProperty(id);
    response.success(req, res, result);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});

router.post('/', async (req: Request, res: Response) => {
  const property: Property = req.body;
  
  try {
    const result: Property = await controller.addProperty(property);
    response.success(req, res, result, 201);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});
router.post('/search', async (req: Request, res: Response) => {
  const property: any = {
    propertyType: req.body.propertyType,
    lat: req.body.lat,
    long: req.body.long,
    mts: req.body.mts,
    state: req.body.state
    
  }
  try {
     await controller.addPropertySearch(property);
    response.success(req, res, "Se ha posteado con exito", 201);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});

router.post('/user/:id', async (req: Request, res: Response) => {
  const property: Property = req.body;
  const id: string = req.params['id'];
  
  try {
    const result: Property = await controller.addUserProperty(property, id);
    response.success(req, res, result, 201);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});


router.patch('/:id', async (req: Request, res: Response) => {
  const property: Partial<Property> = req.body;
  const id: string = req.params['id'];
  
  try {
    const result: Property | null = await controller.updateProperty(id, property);
    response.success(req, res, result, 200);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});

router.patch('/:id/location', async (req: Request, res: Response) => {
  const location: { location: string }= req.body;
  const id: string = req.params['id'];

  try {
    await controller.updateLocationProperty(id, location);
    response.success(req, res, 'Location has been updated', 200);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});


router.patch('/:id/review', async (req: Request, res: Response) => {
  const review : { review: string[] }  = req.body;
  const id: string = req.params['id'];
  try {
    await controller.updateReviewProperty(id, review);
    response.success(req, res, 'Review has been updated', 200);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});


router.delete('/:id', async (req: Request, res: Response) => {
  const id: string = req.params['id'];

  try {
    const result: Property | null = await controller.deleteProperty(id);
    response.success(req, res, result, 200);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});

export default router;