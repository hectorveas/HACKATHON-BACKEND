import model from "./region.schema";
import { Region } from "@models/region.model";


async function getRegions(): Promise<Region[]>{
  return model.find();
}

async function getRegion(id: string): Promise<Region | null>{
  return model.findOne({ _id: id });
}

async function addRegion(region: Region): Promise<Region>{
  return model.create<Region>(region);
}

async function updateRegion(id: string, region: Partial<Region>): Promise<Region | null>{
  return model.findOneAndUpdate({ _id: id }, region);
}

async function deleteRegion(id: string): Promise<Region | null>{
  return model.findOneAndRemove({ _id: id });
}

export default { getRegions, getRegion, addRegion, updateRegion, deleteRegion }
