import { Commune } from "./commune.model";

export interface Location {
  _id?: string;
  latitude: string;
  longitude: string;
  streetName: string;
  number: number;
  block: string;
  commune: string | Commune;
  updatedAt?: Date;
  createdAt?: Date;
};