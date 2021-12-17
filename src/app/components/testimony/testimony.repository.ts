import model from './testimony.schema';
import { Testimony } from "@models/testimony.model";


async function getTestimonies(): Promise<Testimony[]>{
  return model.find();
}

async function getTestimony(id: string): Promise<Testimony | null>{
  return model.findOne({ _id: id });
}

async function addTestimony(testimony: Testimony): Promise<Testimony>{
  return model.create<Testimony>(testimony);
}

async function updateTestimony(id: string, testimony: Partial<Testimony>): Promise<Testimony | null>{
  return model.findOneAndUpdate({ _id: id }, testimony);
}

async function deleteTestimony(id: string): Promise<Testimony | null>{
  return model.findOneAndRemove({_id: id});
}

export default { getTestimonies, getTestimony, addTestimony, updateTestimony, deleteTestimony };
