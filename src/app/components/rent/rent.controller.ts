import repository from "./rent.repository";
import { Rent } from "@models/rent.model";
import codeController from "./../code/code.controller";
import contractController from "./../contract/contract.controller"
import userController from '../user/user.controller';

function getRents(): Promise<Rent[]>{
  return repository.getRents();
}

function getRentsByState(state: string): Promise<Rent[]>{
  return repository.getRentsByState(state);
}

function getRent(id: string): Promise<Rent | null>{
  return repository.getRent(id);
}

function addRent(rent: Rent): Promise<Rent>{
  return repository.addRent(rent);
}

async function addUserRent(rent: Rent, id: string): Promise<Rent>{
  const result = await repository.addRent(rent);
  await userController.updateRent(id, result._id!);
  return result;
}

function updateRent(id: string, rent: Partial<Rent>): Promise<Rent | null>{
  return repository.updateRent(id, rent);
}
 

async function updateCodeRent(id: string, code: { code: string }){
  return repository.updateCodeRent(id,code);
} 
async function updateContractRent(id: string, contract: { contract: string }){
  return repository.updateContractRent(id,contract);
} 

async function deleteRent(id: string): Promise<Rent | null>{
  const rent: Rent | null = await getRent(id);
  await codeController.deleteCode(rent?.code!);
  await contractController.deleteContract(rent?.contract as string);
  return repository.deleteRent(id);
}

async function deleteRents(id: string[]): Promise<Rent[] | null>{
  let result: Rent[] | null= [];
  for (let current of id) {
    const deleted = await deleteRent(current!)
    result.push(deleted!);
  }
  return result;
}

export default { addRent, addUserRent, getRents, getRentsByState, getRent, updateRent,updateCodeRent,updateContractRent,  deleteRent, deleteRents };
