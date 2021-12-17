import repository from "./region.repository";
import { Region } from "@models/region.model";


function getRegions(): Promise<Region[]>{
  return repository.getRegions();
}

function getRegion(id: string): Promise<Region | null>{
  return repository.getRegion(id);
}

function addRegion(region: Region): Promise<Region>{
  return repository.addRegion(region);
}

function updateRegion(id: string, region: Partial<Region>): Promise<Region | null>{
  return repository.updateRegion(id, region);
}

function deleteRegion(id: string): Promise<Region | null>{
  return repository.deleteRegion(id);
}

export default { getRegions, getRegion, addRegion, updateRegion, deleteRegion }
