export interface ProfilePictureVerification { 
  _id?: string;
  frontIdentityCardUrl: string;
  backIdentityCardUrl: string;
  faceUrl: string;
  verified?: boolean;
  verifiedAt?: Date;
  updatedAt?: Date;
  createdAt?: Date;
};
