import repository from "./location.repository";
import { Location } from "@models/location.model";
import rentController from "../rent/rent.controller";
import location from './index';


function getLocations(): Promise<Location[]>{
  return repository.getLocations();
}

function getLocation(id: string): Promise<Location | null>{
  return repository.getLocation(id);
}

function addLocation(location: Location): Promise<Location>{
  return repository.addLocation(location);
}

async function addRentLocation(location: Location, id: string): Promise<Location> {
  const result = await repository.addLocation(location);
  let rent = await rentController.getRent(id);
  rent!.infoUser.location = result._id!;
  await rentController.updateRent(rent!._id!,rent!);
  return result;  
}

function updateLocation(id: string, location: Partial<Location>): Promise<Location | null>{
  return repository.updateLocation(id, location);
}

function deleteLocation(id: string): Promise<Location | null>{
  return repository.deleteLocation(id);
}

export default { getLocations, getLocation, addLocation, addRentLocation, updateLocation, deleteLocation }
