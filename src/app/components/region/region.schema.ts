import { Document, Schema, model } from "mongoose";
import { Region } from "@models/region.model";

const definition: Partial<Record<keyof Region, any>> = {
  name: { type: String, required: true, lowercase: true, trim: true }
};

const schema: Schema<Region> = new Schema(definition, { timestamps: true });

export default model<Region & Document>('Region', schema, 'region');
