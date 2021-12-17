import repository from "./contract.repository";
import { Contract } from "@models/contract.model";
import rentController from "../rent/rent.controller";

function getContracts(): Promise<Contract[]>{
  return repository.getContracts();
}

function getContract(id: string): Promise<Contract | null>{
  return repository.getContract(id);
}

function addContract(contract: Contract): Promise<Contract>{
  return repository.addContract(contract);
}

async function addRentContract(contract: Contract, id: string): Promise<Contract> {
  const result = await addContract(contract);
  let rent = await rentController.getRent(id);
  rent!.contract = result._id!;
  await rentController.updateRent(rent!._id!,rent!);
  return result;
}

function updateContract(id: string, contract: Partial<Contract>): Promise<Contract | null>{
  return repository.updateContract(id, contract);
}

function deleteContract(id: string): Promise<Contract | null>{
  return repository.deleteContract(id);
}

export default { getContracts, getContract, addContract, updateContract, deleteContract, addRentContract }
