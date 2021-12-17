import { PaymentMethod } from "@models/payment-method.model";
import { Schema, model, Document } from "mongoose";



const definition: Partial<Record<keyof PaymentMethod, any>> = {
  name: { type: String, required: true, lowercase: true, trim: true },
  rut: { type: String, required: true, trim: true },
  bank: { type: String, required: true, lowercase: true, trim: true },
  accountType: { type: String, required: true, lowercase: true, trim: true },
  accountNumber: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true }
};

const schema: Schema<PaymentMethod> = new Schema(definition, { timestamps: true });

export default model<PaymentMethod & Document>('PaymentMethod', schema, 'paymentMethod');
