import { Document, Schema, model } from "mongoose";
import { Code } from "@models/code.model";

const definition: Partial<Record<keyof Code, any>> = {
  code: { type: String, required: true, lowercase: true, trim: true },
  discount: { type: Number, required: true },
  isPorcentage: { type: Boolean, required: true }
};

const schema: Schema<Code> = new Schema(definition, { timestamps: true });

export default model<Code & Document>('Code', schema, 'code');
