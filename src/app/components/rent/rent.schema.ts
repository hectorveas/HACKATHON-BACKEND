import { Schema, model, Document } from "mongoose";
import { Rent } from "@models/rent.model";
import mongooseAutoPopulate from 'mongoose-autopopulate';

const definition: Partial<Record<keyof Rent, any>> = {
  property: { type: Schema.Types.ObjectId, required: true, ref: 'Property', trim: true, autopopulate: { maxDepth: 2 } },
  lessee: { type: Schema.Types.ObjectId, required: true, ref: 'User', trim: true, autopopulate: { maxDepth: 2 } },
  infoUser: {
    names: { type: String, required: true, lowercase: true, trim: true },
    rut: { type: String, required: true, trim: true },
    nationality: { type: String, required: true, lowercase: true, trim: true },
    location: { type: Schema.Types.ObjectId, required: true, ref: 'Location', trim: true, autopopulate: { maxDepth: 2 } },
    civilStatus: { type: String, required: true, lowercase: true, trim: true },
    profession: { type: String, required: true, lowercase: true, trim: true }
  },
  legalPersonSigner: { type: Boolean, required: true },
  leaseTime: { type: Number, required: true },
  transferDate: { type: Date, required: true },
  startDate: { type: Date, required: true },
  departureDate: { type: Date, required: true },
  type: { type: String, required: true, lowercase: true, trim: true },
  storage: { type: String, required: true, lowercase: true },
  itemsStoreCategory: [{ type: String, required: true, lowercase: true, trim: true }],
  subtotal: { type: Number, required: true, min: 0 },
  comission: { type: Number, required: true, min: 0 },
  totalPerMonth: { type: Number, required: true, min: 0 },
  code: { type: Schema.Types.ObjectId, ref: 'Code', trim: true, autopopulate: { maxDepth: 2 } },
  payments: [{ type: Schema.Types.ObjectId, ref: 'Payment', trim: true, autopopulate: { maxDepth: 2 } }],
  mailShippingContract: { type: String, lowercase: true, trim: true },
  contract: { type: Schema.Types.ObjectId, ref: 'Contract', trim: true, autopopulate: { maxDepth: 2 } },
  state: { type: String, enum: ['reserved','progress','terminated'], trim: true, lowercase: true }
};

const schema: Schema<Rent> = new Schema(definition, { timestamps: true });
schema.plugin(mongooseAutoPopulate);

export default model<Rent & Document>('Rent', schema, 'rent');
