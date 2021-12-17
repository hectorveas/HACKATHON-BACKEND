import { User } from './user.model';
import { Property } from './property.model';
export interface RequestI {
  _id?: string;
  type: string;
  state: string;
  date: Date;
  reason: string;
  description: string;
  property: string | Property;
  lessee: string | User;
  payment: string;
  updatedAt?: Date;
  createdAt?: Date;
};