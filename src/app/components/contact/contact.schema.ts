import { Document, Schema, model } from "mongoose";
import { Contact } from "@models/contact.model";

const definition: Partial<Record<keyof Contact, any>> = {
  name: { type: String, required: true, lowercase: true },
  email: { type: String, required: true, lowercase: true },
  whatsapp: { type: String, required: true, lowercase: true },
  atentionHour: { type: String, required: true, lowercase: true },
  business: { type: Schema.Types.ObjectId, ref: 'Business', required: true }
};

const schema: Schema<Contact> = new Schema(definition, { timestamps: true });

export default model<Contact & Document>('Contact', schema, 'contact');
