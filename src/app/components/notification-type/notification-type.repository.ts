import model from './notification-type.schema';
import { NotificationType } from "@models/notification-type.model";


async function getNotificationTypes(): Promise<NotificationType[]>{
  return model.find();
}

async function getNotificationType(id: string): Promise<NotificationType | null>{
  return model.findOne({ _id: id });
}

async function addNotificationType(notificationType: NotificationType): Promise<NotificationType>{
  return model.create<NotificationType>(notificationType);
}

async function updateNotificationType(id: string, notificationType: Partial<NotificationType>): Promise<NotificationType | null>{
  return model.findOneAndUpdate({ _id: id }, notificationType);
}

async function deleteNotificationType(id: string): Promise<NotificationType | null>{
  return model.findOneAndRemove({_id: id});
}

export default { getNotificationTypes, getNotificationType, addNotificationType, updateNotificationType, deleteNotificationType };
