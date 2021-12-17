import { Document, Schema, model } from "mongoose";
import { Location } from "@models/location.model";
import mongooseAutoPopulate from 'mongoose-autopopulate';

const definition: Partial<Record<keyof Location, any>> = {
  latitude: { type: String, required: true, trim: true },
  longitude: { type: String, required: true, trim: true },
  streetName: { type: String, required: true, trim: true, lowercase: true },
  block: { type: String, trim: true, lowercase: true },
  number: { type: Number, required: true },
  commune: { type: Schema.Types.ObjectId, ref: 'Commune', required: true, autopopulate: { maxDepth: 2 } }
};

const schema: Schema<Location> = new Schema(definition, { timestamps: true });
schema.plugin(mongooseAutoPopulate);

export default model<Location & Document>('Location', schema, 'location');