import { Schema, model, Document } from "mongoose";
import { Content } from "@models/content.model";


const definition: Partial<Record<keyof Content, any>> = {
  type: { type: String, required: true, default: 'works', enum:['works','question','choose-us'], trim: true, lowercase: true,  },
  position: { type: Number, required: true, min: 0 },
  element: { type: String, required: true, trim: true },
  text: { type: String, required: true, trim: true }
};

const schema: Schema<Content> = new Schema(definition, { timestamps: true });

export default model<Content & Document>('Content', schema, 'content');
