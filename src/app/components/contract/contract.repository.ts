import model from "./contract.schema";
import { Contract } from "@models/contract.model";


async function getContracts(): Promise<Contract[]>{
  return model.find();
}

async function getContract(id: string): Promise<Contract | null>{
  return model.findOne({ _id: id });
}

async function addContract(contract: Contract): Promise<Contract>{
  return model.create<Contract>(contract);
}

async function updateContract(id: string, contract: Partial<Contract>): Promise<Contract | null>{
  return model.findOneAndUpdate({ _id: id }, contract);
}

async function deleteContract(id: string): Promise<Contract | null>{
  return model.findOneAndRemove({ _id: id });
}

export default { getContracts, getContract, addContract, updateContract, deleteContract }
