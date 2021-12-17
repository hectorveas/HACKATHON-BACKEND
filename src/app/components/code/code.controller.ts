import repository from "./code.repository";
import { Code } from "@models/code.model";
import rentController from "../rent/rent.controller";


function getCodes(): Promise<Code[]>{
  return repository.getCodes();
}

function getCode(id: string): Promise<Code | null>{
  return repository.getCode(id);
}

function addCode(code: Code): Promise<Code>{
  return repository.addCode(code);
}

async function addRentCode(code: Code, id: string): Promise<Code> {
  const result = await addCode(code);
  let rent = await rentController.getRent(id);
  rent!.code = result._id!;
  await rentController.updateRent(rent!._id!,rent!);
  return result;
}
addRentCode

function updateCode(id: string, code: Partial<Code>): Promise<Code | null>{
  return repository.updateCode(id, code);
}

function deleteCode(id: string): Promise<Code | null>{
  return repository.deleteCode(id);
}

export default { getCodes, getCode, addCode, updateCode, deleteCode, addRentCode }
