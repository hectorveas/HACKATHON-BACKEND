import model from "./support.schema";
import { Support } from "@models/support.model";


async function getSupports(): Promise<Support[]>{
  return model.find();
}

async function getSupportsByState(state: string): Promise<Support[]>{
  return model.find({ state });
}

async function getSupport(id: string): Promise<Support | null>{
  return model.findOne({ _id: id });
}

async function addSupport(support: Support): Promise<Support>{
  return model.create<Support>(support);
}

async function updateSupport(id: string, support: Partial<Support>): Promise<Support | null>{
  return model.findOneAndUpdate({ _id: id }, support);
}
async function updateMessagesSupport(id: string, messages: { messages: string[] }){
  return model.findOneAndUpdate({ _id: id }, messages);
}

async function deleteSupport(id: string): Promise<Support | null>{
  return model.findOneAndRemove({ _id: id });
}

export default { getSupports, getSupport, getSupportsByState, addSupport, updateSupport,updateMessagesSupport, deleteSupport }
