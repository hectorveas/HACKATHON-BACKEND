import { Schema, model, Document } from "mongoose";
import { Property } from '../../../../../models/property.model';
import mongooseAutoPopulate from 'mongoose-autopopulate';
const mongoose = require('mongoose');
import mongoosePaginate from 'mongoose-paginate-v2';

const definition: Partial<Record<keyof Property, any>> = {
  title: { type: String, required: true, lowercase: true, trim: true },
  description: { type: String, required: true, trim: true  },
  propertyType: { type: String, required: true, trim: true, lowercase: true, enum: ['storage','parking']  },
  location: { type: Schema.Types.ObjectId, ref: 'Location', required: true, autopopulate: { maxDepth: 2 } },
  spaceType: { type: String, required: true, lowercase: true, trim: true },
  rentType: { type: String, required: true, lowercase: true, trim: true },
  height: { type: Number, min: 0 },
  length: { type: Number, min: 0 },
  width: { type: Number, min: 0 },
  utilities: [{ type: String, lowercase: true, trim: true }],
  constructionType: { type: String, lowercase: true, trim: true },
  amenities: [{ type: String, required: true, lowercase: true, trim: true }],
  accessTime: { type: String, required: true, lowercase: true, trim: true },
  floor: { type: Number },
  accessFacilities: [{ type: String, lowercase: true, trim: true }],
  additionalEquipment: [{ type: String, lowercase: true, trim: true }],
  security: [{ type: String, required: true, lowercase: true, trim: true }],
  minimumRecommendedPrice: { type: Number, required: true, min: 0 },
  recommendedMaximumPrice: { type: Number, required: true, min: 0 },
  price: { type: Number, required: true, min: 0 },
  publicationPrice: { type: Number, required: true, min: 0 },
  discountInFirstMonth: { type: Boolean },
  discount: { type: Number, min: 0 },
  minimumMonthsDiscount: { type: Number, min: 0 },
  insured: { type: Boolean },
  state: { type: String, default: 'pending', enum: ['accepted','rejected','pending','deleted'], lowercase: true },
  photos: [{ type: String, required: true, trim: true }],
  lessor: { type: Schema.Types.ObjectId, ref: 'User', required: true, trim: true, autopopulate: { maxDepth: 2 } },
  visits: { type: Number, min: 0, default: 0 },
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review', trim: true, autopopulate: { maxDepth: 2 } }],
  consultations: [{ type: Schema.Types.ObjectId, ref: 'Consultation', trim: true, autopopulate: { maxDepth: 2 } }]
};

const schema: Schema<Property> = new Schema(definition, { timestamps: true });
schema.plugin(mongooseAutoPopulate);

schema.plugin(mongoosePaginate)

const propertyModel = mongoose.model('Property', schema, 'property');
const propertySchema = model<Property & Document>('Property', schema, 'property')

export { propertySchema, propertyModel }

