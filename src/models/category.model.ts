export interface Category {
  _id?: string;
  name: string;
  description: string;
  associatedCategory: string;
  urlBanner: string;
  updatedAt?: Date;
  createdAt?: Date;
};
