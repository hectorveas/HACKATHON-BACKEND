import { Document, Schema, model, Types } from "mongoose";
import { RequestI } from "@models/request.model";
import mongooseAutoPopulate from 'mongoose-autopopulate';

const definition: Partial<Record<keyof RequestI, any>> = {
  date: { type: Date },
  description: { type: String , required: true, trim: true },
  payment: {
    amount: { type: Number, required: true, min: 0 },
    state: { type: String, default: 'pending', trim: true, lowercase: true },
    paymentDate: { type: Date }
  },
  reason: { type: String, lowercase: true, trim: true },
  lessee: { type: Types.ObjectId, trim: true, ref: 'User', autopopulate: { maxDepth: 2 } },
  property: { type: Types.ObjectId ,required: true, trim: true, ref: 'Property', autopopulate: { maxDepth: 2 } },
  state: { type: String, default: 'pending', enum: ['resolved','rejected','pending'], trim: true, lowercase: true },
  type: { type: String, required: true, lowercase: true, trim: true }
};

const schema: Schema<RequestI> = new Schema(definition, { timestamps: true });
schema.plugin(mongooseAutoPopulate);

export default model<RequestI & Document>('Request', schema, 'request');
