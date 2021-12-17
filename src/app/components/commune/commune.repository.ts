import model from "./commune.schema";
import { Commune } from "@models/commune.model";


async function getCommunes(): Promise<Commune[]>{
  return model.find();
}

async function getCommune(id: string): Promise<Commune | null>{
  return model.findOne({ _id: id });
}

async function addCommune(commune: Commune): Promise<Commune>{
  return model.create<Commune>(commune);
}

async function updateCommune(id: string, commune: Partial<Commune>){
  return model.findOneAndUpdate({ _id: id }, commune);
}

async function deleteCommune(id: string): Promise<Commune | null>{
  return model.findOneAndRemove({_id: id});
}

async function getCommunePerRegion(region: string): Promise<Commune[]>{
  return model.find({ region: region });
}

export default { getCommunes, getCommune, addCommune, updateCommune, deleteCommune, getCommunePerRegion }
