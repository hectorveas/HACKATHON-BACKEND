import { Document, Schema, model } from "mongoose";
import { City } from "@models/city.model";


const definition: Partial<Record<keyof City, any>> = {
  name: { type: String, required: true },
  region: { type: Schema.Types.ObjectId, ref: 'Region', required: true },
  updatedAt: { type: Date },
  createdAt: { type: Date }
};

const schema: Schema<City> = new Schema(definition);
schema.index({name: 1});

export default model<City & Document>('City', schema, 'city');
