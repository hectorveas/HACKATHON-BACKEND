import { Rent } from './rent.model';
import { User } from './user.model';
import { Notary } from './notary.model';
import { SigningNaturalPerson } from './signing-natural-person.model';
import { SigningLegalPerson } from './signing-legal-person.model';
import { PaymentMethod } from './payment-method.model';

export interface Contract {
  _id?: string;
  contractNumber?: string;
  user?: string | User;
  propertyType: string;
  propertyOwner: boolean;
  contractLeasedNotary?: boolean;
  legalPersonSigner: boolean;
  notary?: Notary;
  propertyOwnerName?: string;
  propertyUtilities?: string[];
  squareMeter?: number;
  comprendeInmueble?: string[];
  signingNaturalPerson?: SigningNaturalPerson;
  signingLegalPerson?: SigningLegalPerson;
  bankAccount: string | PaymentMethod;
  subleaseDuration: string;
  spacesToSublet: string[];
  spaceUsage: string;
  squareMetersLease: number;
  mailShippingContract?: string;
  leaseDuration: number;
  documentUrl: string;
  contractUrl: string;
  state?: string;
  rent: string | Rent;
  createdAt?: Date;
  updatedAt?: Date;  
}
