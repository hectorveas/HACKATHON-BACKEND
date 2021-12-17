import model from "./location.schema";
import { Location } from "@models/location.model";


async function getLocations(): Promise<Location[]>{
  return model.find()
    .populate('commune');
}

async function getLocation(id: string): Promise<Location | null>{
  return model.findOne({ _id: id })
    .populate('commune');
}

async function addLocation(location: Location): Promise<Location>{
  return model.create<Location>(location);
}

async function updateLocation(id: string, location: Partial<Location>){
  return model.findOneAndUpdate({ _id: id }, location);
}

async function deleteLocation(id: string): Promise<Location | null>{
  return model.findOneAndRemove({_id: id});
}

async function getLocationPerCommune(commune: string): Promise<Location[]>{
  return model.find({ commune: commune })
    .populate('commune');
}

export default { getLocations, getLocation, addLocation, updateLocation, deleteLocation, getLocationPerCommune }
