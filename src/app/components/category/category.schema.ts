import { Schema, model, Document, Types } from "mongoose";
import { Category } from "@models/category.model";


const definition: Partial<Record<keyof Category, any>> = {
  name: { type: String, required: true, unique: true, lowercase: true, trim: true },
  description: { type: String, required: true, trim: true },
  associatedCategory: { type: Types.ObjectId, trim: true },
  urlBanner: { type: String, required: true, trim: true }
};

const schema: Schema<Category> = new Schema(definition, { timestamps: true });
schema.index({ name: 1 });

export default model<Category & Document>('Category', schema, 'category');
