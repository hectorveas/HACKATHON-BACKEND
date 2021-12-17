import model from "./payment.schema";
import { Payment } from "@models/payment.model";


async function getPayments(): Promise<Payment[]>{
  return model.find();
}

async function getPayment(id: string): Promise<Payment | null>{
  return model.findOne({ _id: id });
}

async function addPayment(payment: Payment): Promise<Payment>{
  return model.create<Payment>(payment);
}

async function updatePayment(id: string, payment: Partial<Payment>): Promise<Payment | null>{
  return model.findOneAndUpdate({ _id: id }, payment);
}

async function deletePayment(id: string): Promise<Payment | null>{
  return model.findOneAndRemove({ _id: id });
}

export default { getPayments, getPayment, addPayment, updatePayment, deletePayment }
