import { Schema, model, Document } from "mongoose";
import { Plan } from "@models/plan.model";


const definition: Partial<Record<keyof Plan, any>> = {
  name: { type: String, required: true, unique: true },
  commissionSale: { type: Number, required: true, min: 0 },
  monthlyPublications: { type: String, required: true },
  bannerAdvising: { type: Boolean, required: true, default: false },
  additionalService: [{ type: Schema.Types.ObjectId, ref: 'AdditionalService'}],
  price: { type: Number, min: 0 },
  updatedAt: { type: Date },
  createdAt: { type: Date }
};

const schema: Schema<Plan> = new Schema(definition);

export default model<Plan & Document>('Plan', schema, 'plan');
