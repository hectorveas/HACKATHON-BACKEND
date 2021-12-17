import { Schema, model, Document } from "mongoose";
import { Consultation } from "@models/consultation.model";
import mongooseAutoPopulate from 'mongoose-autopopulate';

const definition: Partial<Record<keyof Consultation, any>> = {
  question: { 
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, trim: true, autopopulate: { maxDepth: 1 } },
    content: { type: String,  required: true, trim: true, lowercase: true },
    isNew: { type: Boolean,  required: true },
    date: { type: Date, required: true }
  },
  answer: {
    user: { type: Schema.Types.ObjectId, ref: 'User', trim: true, autopopulate: { maxDepth: 1 } },
    content: { type: String, trim: true, lowercase: true },
    date: { type: Date, required: true }
  }
};

const schema: Schema<Consultation> = new Schema(definition, { timestamps: true });
schema.plugin(mongooseAutoPopulate);

export default model<Consultation & Document>('Consultation', schema, 'consultation');