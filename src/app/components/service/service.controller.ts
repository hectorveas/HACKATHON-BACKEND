import repository from "./service.repository";
import { Service } from "@models/service.model";


function getServices(): Promise<Service[]>{
  return repository.getServices();
}

function getService(id: string): Promise<Service | null>{
  return repository.getService(id);
}

function addService(service: Service): Promise<Service>{
  return repository.addService(service);
}

function updateService(id: string, service: Partial<Service>): Promise<Service | null>{
  return repository.updateService(id, service);
}

function deleteService(id: string): Promise<Service | null>{
  return repository.deleteService(id);
}

export default { addService, getServices, getService, updateService, deleteService };
