import { Schema, model, Document, Types } from "mongoose";
import { User } from "@models/user.model";
import mongooseAutoPopulate from 'mongoose-autopopulate';
const mongoose = require('mongoose');
import mongoosePaginate from 'mongoose-paginate-v2';

const definition: Partial<Record<keyof User, any>> = {
  names: { type: String, required: true, lowercase: true, trim: true },
  lastNames: { type: String, lowercase: true, trim: true },
  business: { type: Boolean, required: true },
  rut: { type: String, required: true, lowercase: true, trim: true },
  email: { type: String, required: true},
  emailVerification: {
    verified: { type: Boolean },
    verifiedAt: { type: Date }
  },
  phoneNumber: {
    phoneNumber: { type: String, required: true, trim: true },
    verified: { type: Boolean },
    verifiedAt: { type: Date }
  },
  commercialBusiness: { type: String, lowercase: true, trim: true },
  profilePicture: {
    imageUrl: { type: String, required: true, trim: true },
    verification: { type: Types.ObjectId, ref: 'ProfilePictureVerification', trim: true, autopopulate: { maxDepth: 2 } }
  },
  biography: { type: String, trim: true },
  level: { type: String, lowercase: true, trim: true, default: 0 },
  studies: [{ type: String, lowercase: true, trim: true }],
  actualWork: { type: String, lowercase: true, trim: true },
  recognition: [{ type: String, required: true, lowercase: true, trim: true }],
  wantTo: [{ type: String, required: true, lowercase: true, trim: true }],
  reffered: { type: Boolean, required: true },
  averageResponseTime: { type: Number, default: 0, min: 0 },
  properties: [{ type: Types.ObjectId, ref: 'Property', trim: true, autopopulate: { maxDepth: 2 } }],
  activePublications: { type: Number, min: 0 },
  leasedProperties: [{ type: Types.ObjectId, ref: 'Rent', trim: true, autopopulate: { maxDepth: 2 } }],
  supports: [{ type: Types.ObjectId, ref: 'Support', trim: true, autopopulate: { maxDepth: 2 } }],
  reviews: [{ type: Types.ObjectId, ref: 'Review', trim: true, autopopulate: { maxDepth: 2 } }],
  consultations: [{ type: Types.ObjectId, ref: 'Consultation', trim: true, autopopulate: { maxDepth: 2 } }],
  paymentMethods: [{ type: Types.ObjectId, ref: 'PaymentMethod', trim: true, autopopulate: { maxDepth: 2 } }],
  payments: [{ type: Types.ObjectId, ref: 'Payment', trim: true, autopopulate: { maxDepth: 2 } }],
  paymentesReceived: [{ type: Types.ObjectId, ref: 'Payment', trim: true, autopopulate: { maxDepth: 2 } }],
  //invitations: [{ type: Types.ObjectId, ref: '**pendiente**', trim: true }],
  contracts: [{ type: Types.ObjectId, ref: 'Contract', trim: true, autopopulate: { maxDepth: 2 } }],
  requests: [{ type: Types.ObjectId, ref: 'Request', trim: true, autopopulate: { maxDepth: 2 } }],
  lastCodeVerification: { 
    code: { type: String },
    generated_at: { type: Date }
  }
};

const schema: Schema<User> = new Schema(definition, { timestamps: true });
schema.plugin(mongooseAutoPopulate);
schema.plugin(mongoosePaginate)

const userModel = mongoose.model('User', schema, 'user');
const userSchema = model<User & Document>('User', schema, 'user')

export { userModel, userSchema }