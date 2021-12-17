import model from './service.schema';
import { Service } from "@models/service.model";


async function getServices(): Promise<Service[]>{
  return model.find();
}

async function getService(id: string): Promise<Service | null>{
  return model.findOne({ _id: id });
}

async function addService(service: Service): Promise<Service>{
  return model.create<Service>(service);
}

async function updateService(id: string, service: Partial<Service>): Promise<Service | null>{
  return model.findOneAndUpdate({ _id: id }, service);
}

async function deleteService(id: string): Promise<Service | null>{
  return model.findOneAndRemove({_id: id});
}

export default { getServices, getService, addService, updateService, deleteService };
