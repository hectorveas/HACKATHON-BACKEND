import model from './comission.schema';
import { Comission } from "@models/comission.model";


async function getComissions(): Promise<Comission[]>{
  return model.find();
}

async function getComission(id: string): Promise<Comission | null>{
  return model.findOne({ _id: id });
}

async function addComission(comission: Comission): Promise<Comission>{
  return model.create<Comission>(comission);
}

async function updateComission(id: string, comission: Partial<Comission>): Promise<Comission | null>{
  return model.findOneAndUpdate({ _id: id }, comission);
}

async function deleteComission(id: string): Promise<Comission | null>{
  return model.findOneAndRemove({_id: id});
}

export default { getComissions, getComission, addComission, updateComission, deleteComission };
