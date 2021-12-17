import { User } from './user.model';
export interface Review {
    _id?: string;
    user: string | User;
    description: string;
    updatedAt?: Date;
    createdAt?: Date;
};