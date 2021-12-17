import repository from "./request.repository";
import { RequestI } from "@models/request.model";


function getRequests(): Promise<RequestI[]>{
  return repository.getRequests();
}

function getRequestsByState(state: string): Promise<RequestI[]>{
  return repository.getRequestsByState(state);
}

function getRequest(id: string): Promise<RequestI | null>{
  return repository.getRequest(id);
}

async function addRequest(request: RequestI): Promise<RequestI | null>{
  const newRequest: RequestI = await repository.addRequest(request);
  return repository.updateRequest(newRequest._id!, newRequest);
}

function updateRequest(id: string, Request: Partial<RequestI>): Promise<RequestI | null>{
  return repository.updateRequest(id, Request);
}

function deleteRequest(id: string): Promise<RequestI | null>{
  return repository.deleteRequest(id);
}

export default { getRequests, getRequest, getRequestsByState, addRequest, updateRequest, deleteRequest }
