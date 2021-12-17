import { User } from "./user.model";
import { Admin } from "./admin.model";

export interface Message { 
  _id?: string;
  message: string;
  user: User | Admin | string;
  entity: string;
  updatedAt?: Date;
  createdAt?: Date;
};
