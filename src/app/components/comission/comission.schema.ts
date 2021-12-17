import { Schema, model, Document } from "mongoose";
import { Comission } from "@models/comission.model";


const definition: Partial<Record<keyof Comission, any>> = {
  percentage: { type: Number, required: true, min: 0 }
};

const schema: Schema<Comission> = new Schema(definition, { timestamps: true });

export default model<Comission & Document>('Comission', schema, 'comission');
