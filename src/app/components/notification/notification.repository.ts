import model from "./notification.schema";
import { Notification } from "@models/notification.model";


async function getNotifications(): Promise<Notification[]>{
  return model.find();
}

async function getNotification(id: string): Promise<Notification | null>{
  return model.findOne({ _id: id });
}

async function addNotification(notification: Notification): Promise<Notification>{
  return model.create<Notification>(notification);
}

async function updateNotification(id: string, notification: Partial<Notification>): Promise<Notification | null>{
  return model.findOneAndUpdate({ _id: id }, notification);
}

async function deleteNotification(id: string): Promise<Notification | null>{
  return model.findOneAndRemove({ _id: id });
}

export default { getNotifications, getNotification, addNotification, updateNotification, deleteNotification }
