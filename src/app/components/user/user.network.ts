import express, { Request, Response, Router } from "express";
import { User } from "@models/user.model";
import response from "../../modules/reponse.module";
import controller from "./user.controller";
import multer from "multer";
import authMiddleware from "../../middlewares/auth.middleware";
import imageUpload from "../../modules/storage.module"
import { S3Collection } from "../../enums/s3-collections.enum";

const multerMemoryStorage = multer.memoryStorage();
const multerUploadInMemory = multer({
  storage: multerMemoryStorage
});

const router: Router = express.Router();

router.get('/all', authMiddleware('admin'), async (req: Request, res: Response) => {
  try {
    const result: Array<User> = await controller.getUsers();
    response.success(req, res, result);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});

router.get('/verification/all', authMiddleware('admin'), async (req: Request, res: Response) => {
  try {
    const result: Array<User> = await controller.getUsersByVerification();
    response.success(req, res, result);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});

router.get('/:id', authMiddleware('both'),async (req: Request, res: Response) => {
  const id: string = req.params.id;

  try {
    const result: any | null = await controller.getUser(id);
    response.success(req, res, result);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});
router.post('/create', async (req: Request, res: Response) => {
  const user: any = req.body;

  try {
    const result: User | null = await controller.addUser(user);
    response.success(req, res, result, 200);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});
router.post('/:id/profile-picture',multerUploadInMemory.array('image',1),  async (req: Request, res: Response) => {
  const id = req.params.id;
  const image: any = req.files;
  try {
    const result: any = await imageUpload.uploadImages(req,res,S3Collection.USERS,id) ;
    const newImage = result.toString()
    await controller.updateProfilePicture(id,newImage)
    response.success(req, res, result, 200);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});
router.patch('/:id', async (req: Request, res: Response) => {
  const user: any = req.body;
  const id: string = req.params['id'];

  try {
    const result: User | null = await controller.updateUser(id, user);
    response.success(req, res, result, 200);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});

router.patch('/:id/password', async (req: Request, res: Response) => {
  const password: { newPassword: string } = req.body;
  const id: string = req.params['id'];

  try {
    await controller.changePassword(id, password.newPassword);
    response.success(req, res, 'Password has been updated', 200);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  const id: string = req.params['id'];

  try {
    const result: User | null = await controller.deleteUser(id);
    response.success(req, res, result, 200);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});

router.post('/send-code', async (req: Request, res: Response) => {
  const email: string = req.body.email;

  try {
    const result: any = await controller.addRecoveyCode(email);
    response.success(req, res, result, 200);
  }
  catch (error){
    console.error(error);
    response.error(req, res, 'Invalid Information', 500);
  };
});

router.get('/verificate-code/:email/:code', async (req: Request, res: Response) => {
  const email: any = req.params['email'];
  const code: any = req.params['code'];

  try {
    const result: boolean = await controller.checkCode(email, code);
    response.success(req, res, result, 200);
  }
  catch (error){
    console.error(error);
    response.error(req, res, 'Invalid Information', 500);
  }
})
export default router;
