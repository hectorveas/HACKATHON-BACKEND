import { ProfilePictureVerification } from './profile-picture-verification';
import { Contract } from './contract.model';
import { Payment } from './payment.model';
import { Consultation } from './consultation.model';
import { Review } from './review.model';
import { Support } from './support.model';
import { Property } from "./property.model";
import { RequestI } from './request.model';

export interface User {
  _id?: string;
  names: string;
  lastNames: string;
  business: boolean;
  rut: string;
  email: string,
  emailVerification: {
    verified: boolean,
    verifiedAt: Date
  };
  phoneNumber: {
    phoneNumber: string,
    verified: boolean,
    verifiedAt: Date
  }
  commercialBusiness: string;
  profilePicture: {
    imageUrl: string,
    verification: string | boolean | ProfilePictureVerification
  };
  biography: string;
  level: string;
  studies: string[];
  actualWork: string;
  recognition: string[];
  wantTo: string[];
  reffered: boolean;
  averageResponseTime: number;
  properties: string[] | Property[];
  activePublications: number;
  leasedProperties: string[];
  supports: string[] | Support[];
  reviews: string[] | Review[];
  consultations: string[] | Consultation[];
  paymentMethods: string[];
  payments: string[] | Payment[];
  paymentesReceived: string[];
  invitations: string[];
  contracts: string[] | Contract[];
  requests: string[] | RequestI[];
  lastCodeVerification?: any;
  updatedAt?: Date;
  createdAt?: Date;
};
