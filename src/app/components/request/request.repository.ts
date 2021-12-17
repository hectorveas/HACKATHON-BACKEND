import model from "./request.schema";
import { RequestI } from "@models/request.model";


async function getRequests(): Promise<RequestI[]>{
  return model.find();
}

async function getRequestsByState(state: string): Promise<RequestI[]>{
  return model.find({ state });
}

async function getRequest(id: string): Promise<RequestI | null>{
  return model.findOne({ _id: id });
}

async function addRequest(request: RequestI): Promise<RequestI>{
  return model.create<RequestI>(request);
}

async function updateRequest(id: string, request: Partial<RequestI>): Promise<RequestI | null>{
  return model.findOneAndUpdate({ _id: id }, request);
}

async function deleteRequest(id: string): Promise<RequestI | null>{
  return model.findOneAndRemove({ _id: id });
}

export default { getRequests, getRequest, getRequestsByState, addRequest, updateRequest, deleteRequest }
