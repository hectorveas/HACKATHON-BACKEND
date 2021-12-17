import repository from "./testimony.repository";
import { Testimony } from "@models/testimony.model";


function getTestimonies(): Promise<Testimony[]>{
  return repository.getTestimonies();
}

function getTestimony(id: string): Promise<Testimony | null>{
  return repository.getTestimony(id);
}

function addTestimony(testimony: Testimony): Promise<Testimony>{
  return repository.addTestimony(testimony);
}

function updateTestimony(id: string, testimony: Partial<Testimony>): Promise<Testimony | null>{
  return repository.updateTestimony(id, testimony);
}

function deleteTestimony(id: string): Promise<Testimony | null>{
  return repository.deleteTestimony(id);
}

export default { addTestimony, getTestimonies, getTestimony, updateTestimony, deleteTestimony };
