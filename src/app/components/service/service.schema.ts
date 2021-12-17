import { Schema, model, Document } from "mongoose";
import { Service } from "@models/service.model";


const definition: Partial<Record<keyof Service, any>> = {
  serviceType: { type: String, required: true, enum: ['flete','favor'], trim: true },
  type: { type: String, enum: ['order','clean','keys'], trim: true },
  state: { type: String, default: 'pending', enum: ['accepted','rejected','pending','deleted'], trim: true, lowercase: true },
  date: { type: Date, required: true },
  receivingAddress: { type: Schema.Types.ObjectId, ref: 'Address', trim: true },
  deliveryAddress: { type: Schema.Types.ObjectId, ref: 'Address', trim: true },
  description: { type: String, required: true, trim: true },
  business: { type: String, lowercase: true, trim: true },
  property: { type: Schema.Types.ObjectId, ref: 'Property', trim: true },
  user: { type: Schema.Types.ObjectId, required: true, ref: 'User', trim: true },
  infoPayment: {
    amount: { type: Number, required: true, min: 0 },
    amountToPay: { type: Number, required: true, min: 0 },
    state: { type: String, default: 'pending', enum: ['accepted','rejected','pending','deleted'], trim: true, lowercase: true },
    paymentDate: { type: Date }    
  }
};

const schema: Schema<Service> = new Schema(definition, { timestamps: true });

export default model<Service & Document>('Service', schema, 'service');
