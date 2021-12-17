import { Schema, model, Document } from "mongoose";
import { Term } from "@models/term.model";


const definition: Partial<Record<keyof Term, any>> = {
  description: { type: String, required: true, unique: true, trim: true }
};

const schema: Schema<Term> = new Schema(definition, { timestamps: true });

export default model<Term & Document>('Term', schema, 'term');
