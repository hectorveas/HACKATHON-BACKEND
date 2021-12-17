import { Document, Schema, model, Types } from "mongoose";
import { Payment } from "@models/payment.model";
import mongooseAutoPopulate from 'mongoose-autopopulate';

const definition: Partial<Record<keyof Payment, any>> = {
  code: { type: Schema.Types.ObjectId, ref: 'Code', trim: true, autopopulate: { maxDepth: 1 } },
  paymentDate: { type: Date, required: true },
  maximumPaymentDate: { type: Date, required: true },
  remainingAccumulatedPayment: { type: Number, required: true, min: 0 },
  rent: { type: Schema.Types.ObjectId, ref: 'Rent', required: true, trim: true, autopopulate: { maxDepth: 2 } },
  state: { type: String, required: true, lowercase: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  receiver: { type: Schema.Types.ObjectId, ref: 'User', trim: true, autopopulate: { maxDepth: 2 } }
};

const schema: Schema<Payment> = new Schema(definition, { timestamps: true });
schema.plugin(mongooseAutoPopulate);

export default model<Payment & Document>('Payment', schema, 'payment');
