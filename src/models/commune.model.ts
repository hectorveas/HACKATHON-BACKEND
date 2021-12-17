import { Region } from "./region.model";

export interface Commune {
  _id?: string;
  region: string | Region;
  name: string;
  updatedAt?: Date;
  createdAt?: Date;
};
