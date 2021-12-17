export interface PaymentMethod { 
  _id?: string;
  name: string;
  rut: string;
  bank: string;
  accountType: string;
  accountNumber: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
};
