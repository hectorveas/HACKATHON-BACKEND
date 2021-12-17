import model from './payment-method.schema';
import { PaymentMethod } from "@models/payment-method.model";


async function getPaymentMethods(): Promise<PaymentMethod[]>{
  return model.find();
}

async function getPaymentMethod(id: string): Promise<PaymentMethod | null>{
  return model.findOne({ _id: id });
}

async function addPaymentMethod(paymentMethod: PaymentMethod): Promise<PaymentMethod>{
  return model.create<PaymentMethod>(paymentMethod);
}

async function updatePaymentMethod(id: string, paymentMethod: Partial<PaymentMethod>): Promise<PaymentMethod | null>{
  return model.findOneAndUpdate({ _id: id }, paymentMethod);
}

async function deletePaymentMethod(id: string): Promise<PaymentMethod | null>{
  return model.findOneAndRemove({_id: id});
}

async function deletePaymentMethods(ids: string[]): Promise<PaymentMethod[] | null>{
  return model.deleteMany({_id: {$in: ids}});
}

export default { getPaymentMethods, getPaymentMethod, addPaymentMethod, updatePaymentMethod, deletePaymentMethod, deletePaymentMethods };
