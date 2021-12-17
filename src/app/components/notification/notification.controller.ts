import repository from "./notification.repository";
import { Notification } from "@models/notification.model";


function getNotifications(): Promise<Notification[]>{
  return repository.getNotifications();
}

function getNotification(id: string): Promise<Notification | null>{
  return repository.getNotification(id);
}

function addNotification(notification: Notification): Promise<Notification>{
  return repository.addNotification(notification);
}

function updateNotification(id: string, notification: Partial<Notification>): Promise<Notification | null>{
  return repository.updateNotification(id, notification);
}

function deleteNotification(id: string): Promise<Notification | null>{
  return repository.deleteNotification(id);
}

export default { getNotifications, getNotification, addNotification, updateNotification, deleteNotification }
