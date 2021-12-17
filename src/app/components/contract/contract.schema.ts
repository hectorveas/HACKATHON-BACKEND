import { Document, Schema, model } from "mongoose";
import { Contract } from "@models/contract.model";
import mongooseAutoPopulate from 'mongoose-autopopulate';

const definition: Partial<Record<keyof Contract, any>> = {
  contractNumber: { type: Number },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true, trim: true, autopopulate: { maxDepth: 2 } },
  propertyType: { type: String, required: true, lowercase: true, trim: true },
  propertyOwner: { type: Boolean, required: true },
  contractLeasedNotary: { type: Boolean },
  legalPersonSigner: { type: Boolean, required: true },
  notary: {
    commune: { type: Schema.Types.ObjectId, required: true, ref: 'Commune', trim: true, autopopulate: { maxDepth: 2 } },
    notaryName: { type: String, required: true, lowercase: true, trim: true }
  },
  propertyOwnerName: { type: String, lowercase: true, trim: true },
  propertyUtilities: [{ type: String, lowercase: true, trim: true }],
  squareMeter: { type: Number, min: 0 },  
  signingNaturalPerson: {
    name: { type: String, required: true, lowercase: true, trim: true },
    rut: { type: String, required: true, lowercase: true, trim: true },
    nationality: { type: String, required: true, lowercase: true, trim: true },
    address: { type: Schema.Types.ObjectId, required: true, ref: 'Location', trim: true, autopopulate: { maxDepth: 2 } },
    civilStatus: { type: String, required: true, lowercase: true, trim: true },
    profession: { type: String, required: true, lowercase: true, trim: true }
  },
  signingLegalPerson: {
    businessName: { type: String, required: true, lowercase: true, trim: true },
    businessRut: { type: String, required: true, lowercase: true, trim: true},
    address: { type: Schema.Types.ObjectId, required: true, ref: 'Location', trim: true, autopopulate: { maxDepth: 2 } },
    legalRepresentativeName: { type: String, required: true, lowercase: true, trim: true }, 
    legalRepresentativeNationality: { type: String, required: true, lowercase: true, trim: true },
    legalRepresentativeRut: { type: String, required: true, lowercase: true, trim: true }
  },
  bankAccount: { type: Schema.Types.ObjectId, required: true, ref: 'PaymentMethod', trim: true, autopopulate: { maxDepth: 2 } },
  subleaseDuration: { type: String, required: true, lowercase: true, trim: true },
  spacesToSublet: [{ type: String, required: true, lowercase: true, trim: true }],
  spaceUsage: { type: String, required: true, lowercase: true, trim: true },
  squareMetersLease: { type: Number, required: true, min: 0 },
  mailShippingContract: { type: String, lowercase: true, trim: true },
  leaseDuration: { type: Number, required: true, min: 0 },
  documentUrl: { type: String, required: true, trim: true },
  contractUrl: { type: String, required: true, trim: true },
  state: { type: String, default: 'pending', enum: ['accepted','rejected','pending','deleted'], trim: true, lowercase: true },
  rent: { type: Schema.Types.ObjectId, required: true, ref: 'Rent', trim: true, autopopulate: { maxDepth: 2 } },
  comprendeInmueble: [{ type: String, lowercase: true, trim: true }]
};

const schema: Schema<Contract> = new Schema(definition, { timestamps: true });
schema.plugin(mongooseAutoPopulate);

export default model<Contract & Document>('Contract', schema, 'contract');
