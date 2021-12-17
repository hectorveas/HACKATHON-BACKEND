export interface SigningLegalPerson {
  _id?: string;
  businessName: string;
  businessRut: string;
  address: string;
  legalRepresentativeName: string;
  legalRepresentativeNationality: string;
  legalRepresentativeRut: string;
  updatedAt?: Date;
  createdAt?: Date;
};
