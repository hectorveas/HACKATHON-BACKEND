import { Schema, model, Document } from "mongoose";
import { Review } from "@models/review.model";
import mongooseAutoPopulate from 'mongoose-autopopulate';

const definition: Partial<Record<keyof Review, any>> = {
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true, trim: true, autopopulate: { maxDepth: 2 } },
  description: { type: String, required: true, trim: true }
};

const schema: Schema<Review> = new Schema(definition, { timestamps: true });
schema.index({ name: 1 });
schema.plugin(mongooseAutoPopulate);

export default model<Review & Document>('Review', schema, 'review');