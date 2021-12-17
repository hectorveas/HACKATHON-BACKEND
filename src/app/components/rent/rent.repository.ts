import model from './rent.schema';
import { Rent } from "@models/rent.model";


async function getRents(): Promise<Rent[]>{
  return model.find();
}

async function getRentsByState(state: string): Promise<Rent[]>{
  return model.find({ state });
}

async function getRent(id: string): Promise<Rent | null>{
  return model.findOne({ _id: id });
}

async function addRent(rent: Rent): Promise<Rent>{
  return model.create<Rent>(rent);
}

async function updateRent(id: string, rent: Partial<Rent>): Promise<Rent | null>{
  return model.findOneAndUpdate({ _id: id }, rent);
}
async function updateCodeRent(id: string, code:{ code: string }){
  return model.findOneAndUpdate({_id: id} ,code );
}
async function updateContractRent(id: string, contract:{ contract: string }){
  return model.findOneAndUpdate({_id: id} ,contract );
}

async function deleteRent(id: string): Promise<Rent | null>{
  return model.findOneAndRemove({_id: id});
}

export default { getRents, getRentsByState, getRent, addRent, updateRent,updateCodeRent,updateContractRent, deleteRent };
