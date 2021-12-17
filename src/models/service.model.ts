import { InfoPayment } from "./info-payment.model";

export interface Service {
  _id?: string;
  serviceType: string;
  type: string;
  state?: string;
  date: Date;
  receivingAddress: string;
  deliveryAddress?: string;
  description: string;
  business?: string;
  property?: string;
  user: string;
  infoPayment?: InfoPayment;
  createdAt?: Date;
  updatedAt?: Date;
};
