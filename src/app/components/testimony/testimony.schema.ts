import { Schema, model, Document } from "mongoose";
import { Testimony } from "@models/testimony.model";


const definition: Partial<Record<keyof Testimony, any>> = {
  name: { type: String, required: true, lowercase: true, trim: true },
  description: { type: String, required: true, trim: true },
  ubication: { type: String, required: true, trim: true }
};

const schema: Schema<Testimony> = new Schema(definition, { timestamps: true });

export default model<Testimony & Document>('Testimony', schema, 'testimony');
