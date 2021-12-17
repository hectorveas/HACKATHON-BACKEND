import { Code } from './code.model';
import { User } from './user.model';
import { Rent } from './rent.model';
export interface Payment {
    _id?: string;
    code?: string | Code;
    paymentDate: Date;
    maximumPaymentDate: Date;
    remainingAccumulatedPayment: number;
    rent: string | Rent;
    state: string;
    price: number;
    receiver?: string | User;
    createdAt?: Date;
    modifiedAt?: Date;
}