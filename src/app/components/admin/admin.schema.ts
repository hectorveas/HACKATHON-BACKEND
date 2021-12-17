import { Schema, model, Document } from "mongoose";
import { Admin } from "@models/admin.model";


const definition: Partial<Record<keyof Admin, any>> = {
  username: { type: String, required: true, lowercase: true, trim: true },
  role: { type: String, default: 'corporate', lowercase: true, trim: true }
};

const schema: Schema<Admin> = new Schema(definition, { timestamps: true });

export default model<Admin & Document>('Admin', schema, 'admin');
