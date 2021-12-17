import express, { Request, Response, Router } from "express";
import response from "../../modules/reponse.module";
import controller from "./notification-type.controller";
import { NotificationType } from "@models/notification-type.model";


const router: Router = express.Router();

router.get('/all', async (req: Request, res: Response) => {
  try {
    const result: NotificationType[] = await controller.getNotificationTypes();
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
    const result: NotificationType | null = await controller.getNotificationType(id);
    response.success(req, res, result);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});

router.post('/', async (req: Request, res: Response) => {
  const notificationType: NotificationType = req.body;
  
  try {
    const result: NotificationType = await controller.addNotificationType(notificationType);
    response.success(req, res, result, 201);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});

router.patch('/:id', async (req: Request, res: Response) => {
  const notificationType: Partial<NotificationType> = req.body;
  const id: string = req.params['id'];

  try {
    const result: NotificationType | null = await controller.updateNotificationType(id, notificationType);
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
    const result: NotificationType | null = await controller.deleteNotificationType(id);
    response.success(req, res, result, 200);
  }
  catch (error) {
    console.error(error);
    response.error(req, res, 'Invalid information', 500);
  }
});

export default router;