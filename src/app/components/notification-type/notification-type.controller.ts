import repository from "./notification-type.repository";
import { NotificationType } from "@models/notification-type.model";


function getNotificationTypes(): Promise<NotificationType[]>{
  return repository.getNotificationTypes();
}

function getNotificationType(id: string): Promise<NotificationType | null>{
  return repository.getNotificationType(id);
}

function addNotificationType(notificationType: NotificationType): Promise<NotificationType>{
  return repository.addNotificationType(notificationType);
}

function updateNotificationType(id: string, notificationType: Partial<NotificationType>): Promise<NotificationType | null>{
  return repository.updateNotificationType(id, notificationType);
}

function deleteNotificationType(id: string): Promise<NotificationType | null>{
  return repository.deleteNotificationType(id);
}

export default { addNotificationType, getNotificationTypes, getNotificationType, updateNotificationType, deleteNotificationType };
