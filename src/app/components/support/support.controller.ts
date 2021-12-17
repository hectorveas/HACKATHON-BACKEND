import repository from "./support.repository";
import { Support } from "@models/support.model";
import controller from "./../message/message.controller"
import userController from '../user/user.controller';


function getSupports(): Promise<Support[]>{
  return repository.getSupports();
}

function getSupportsByState(state: string): Promise<Support[]>{
  return repository.getSupportsByState(state);
}

function getSupport(id: string): Promise<Support | null>{
  return repository.getSupport(id);
}

async function addSupport(support: Support): Promise<Support | null>{
  let newSupport: Support = await repository.addSupport(support);
  newSupport.ticketNumber = newSupport._id!.toString().substring(0,5); 
  return repository.updateSupport(newSupport._id!, newSupport);
}

async function addUserSupport(support: Support, id: string): Promise<Support | null> {
  const result = await repository.addSupport(support);
  await userController.updateSupport(id, result._id!);
  return result;
}
async function updateMessagesSupport(id: string, messages: { messages: string[] }  ) {
  return await repository.updateMessagesSupport(id, messages);
}


function updateSupport(id: string, support: Partial<Support>): Promise<Support | null>{
  return repository.updateSupport(id, support);
}

async function deleteSupport(id: string): Promise<Support | null>{
  const supportTicket: Support | null = await getSupport(id);
  controller.deleteMessages(supportTicket?.messages! as string[])
  return repository.deleteSupport(id);
}

async function deleteSupports(id: string[]): Promise<Support[] | null>{
  let result: Support[] | null= [];
  for (let current of id) {
    const deleted = await deleteSupport(current!)
    result.push(deleted!);
  }
  return result;
}


export default { getSupports, getSupport, getSupportsByState, addSupport, addUserSupport, updateSupport,updateMessagesSupport, deleteSupport, deleteSupports }
