import { Schema, model, Document } from "mongoose";
import { AboutUs } from "@models/about-us.model";


const definition: Partial<Record<keyof AboutUs, any>> = {
  type: { type: String, required: true, default: 'about-us', enum:['about-us','support-us'], trim: true },
  description: { type: String, required: true, trim: true }
};

const schema: Schema<AboutUs> = new Schema(definition, { timestamps: true });

export default model<AboutUs & Document>('AboutUs', schema, 'aboutUs');
