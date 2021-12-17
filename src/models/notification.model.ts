import { NotificationType } from './notification-type.model';
export interface Notification {
  _id?: string;
  type: string | NotificationType;
  url: string;
  entity: string;
  reference: string;
  viewed: boolean;
  updatedAt?: Date;
  createdAt?: Date;
};