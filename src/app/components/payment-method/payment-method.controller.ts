import repository from "./payment-method.repository";
import { PaymentMethod } from "@models/payment-method.model";
import userController from '../user/user.controller';


function getPaymentMethods(): Promise<PaymentMethod[]>{
  return repository.getPaymentMethods();
}

function getPaymentMethod(id: string): Promise<PaymentMethod | null>{
  return repository.getPaymentMethod(id);
}

function addPaymentMethod(paymentMethod: PaymentMethod): Promise<PaymentMethod>{
  return repository.addPaymentMethod(paymentMethod);
}

async function addUserPaymentMethod(paymentMethod: PaymentMethod, id: string): Promise<PaymentMethod>{
  const result = await repository.addPaymentMethod(paymentMethod);
  await userController.updatePaymentMethod(id, result._id!);
  return result;
}

function updatePaymentMethod(id: string, paymentMethod: Partial<PaymentMethod>): Promise<PaymentMethod | null>{
  return repository.updatePaymentMethod(id, paymentMethod);
}

function deletePaymentMethod(id: string): Promise<PaymentMethod | null>{
  return repository.deletePaymentMethod(id);
}

function deletePaymentMethods(ids: string[]): Promise<PaymentMethod[] | null>{
  return repository.deletePaymentMethods(ids);
}



export default { addPaymentMethod, addUserPaymentMethod, getPaymentMethods, getPaymentMethod, updatePaymentMethod, deletePaymentMethod, deletePaymentMethods };
