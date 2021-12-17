import { Document, Schema, model } from "mongoose";
import { Support } from "@models/support.model";
import mongooseAutoPopulate from 'mongoose-autopopulate';

const definition: Partial<Record<keyof Support, any>> = {
  ticketNumber: { type: String, lowercase: true, trim: true },
  issue: { type: String, required: true, lowercase: true, trim: true },
  messages: [{ type: Schema.Types.ObjectId, ref: 'Message', required: true, trim: true, autopopulate: { maxDepth: 2 } }],
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true, trim: true, autopopulate: { maxDepth: 2 } },  
  state: { type: String, required: true, default: 'pending', enum: ['terminated','progress','pending'], lowercase: true, trim: true },
  description: { type: String, required: true, trim: true }
};

const schema: Schema<Support> = new Schema(definition, { timestamps: true });
schema.plugin(mongooseAutoPopulate);

export default model<Support & Document>('Support', schema, 'support');
