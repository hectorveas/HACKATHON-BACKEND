import { Document, Schema, model } from "mongoose";
import { Commune } from "@models/commune.model";
import mongooseAutoPopulate from 'mongoose-autopopulate';


const definition: Partial<Record<keyof Commune, any>> = {
  name: { type: String, required: true, lowercase: true, trim: true },
  region: { type: Schema.Types.ObjectId, ref: 'Region', required: true, autopopulate: { maxDepth: 1 } }
};

const schema: Schema<Commune> = new Schema(definition, { timestamps: true });
schema.index({name: 1});
schema.plugin(mongooseAutoPopulate);
export default model<Commune & Document>('Commune', schema, 'commune');
