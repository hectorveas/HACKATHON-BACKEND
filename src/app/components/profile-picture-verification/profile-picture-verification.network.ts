import express, { Request, Response, Router } from "express";
import response from "../../modules/reponse.module";
import controller from "./profile-picture-verification.controller";
import { ProfilePictureVerification } from "@models/profile-picture-verification";
import multer from "multer";
import imageUpload from "../../modules/storage.module"
import { S3Collection } from "../../enums/s3-collections.enum";

const multerMemoryStorage = multer.memoryStorage();
const multerUploadInMemory = multer({
  storage: multerMemoryStorage
});
const router: Router = express.Router();



router.get('/all', async (req: Request, res: Response) => {
  try {
    const result: ProfilePictureVerification[] = await controller.getProfilePictureVerifications();
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
    const result: ProfilePictureVerification | null = await controller.getProfilePictureVerification(id);
    response.success(req, res, result);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});

router.post('/', async (req: Request, res: Response) => {
  const profilePictureVerification: ProfilePictureVerification = req.body;
  
  try {
    const result: ProfilePictureVerification = await controller.addProfilePictureVerification(profilePictureVerification);
    response.success(req, res, result, 201);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});

router.post('/user/:id',multerUploadInMemory.array('files',3), async (req: Request, res: Response) => {
  const files = req.files
  const id: string = req.params['id'];

  try {
    const newUrl = await imageUpload.uploadImages(req,res,S3Collection.USERS,id)

    const result: ProfilePictureVerification = await controller.addUserProfilePictureVerification(newUrl, id);
    response.success(req, res, result, 201);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});

router.patch('/:id', async (req: Request, res: Response) => {
  const profilePictureVerification: Partial<ProfilePictureVerification> = req.body;
  const id: string = req.params['id'];

  try {
    const result: ProfilePictureVerification | null = await controller.updateProfilePictureVerification(id, profilePictureVerification);
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
    const result: ProfilePictureVerification | null = await controller.deleteProfilePictureVerification(id);
    response.success(req, res, result, 200);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});

export default router;