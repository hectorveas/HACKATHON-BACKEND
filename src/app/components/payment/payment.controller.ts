import repository from "./payment.repository";
import { Payment } from "@models/payment.model";


function getPayments(): Promise<Payment[]>{
  return repository.getPayments();
}

function getPayment(id: string): Promise<Payment | null>{
  return repository.getPayment(id);
}

function addPayment(payment: Payment): Promise<Payment>{
  return repository.addPayment(payment);
}

function updatePayment(id: string, payment: Partial<Payment>): Promise<Payment | null>{
  return repository.updatePayment(id, payment);
}

function deletePayment(id: string): Promise<Payment | null>{
  return repository.deletePayment(id);
}

export default { getPayments, getPayment, addPayment, updatePayment, deletePayment }
