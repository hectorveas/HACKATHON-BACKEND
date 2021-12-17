import repository from "./comission.repository";
import { Comission } from "@models/comission.model";


function getComissions(): Promise<Comission[]>{
  return repository.getComissions();
}

function getComission(id: string): Promise<Comission | null>{
  return repository.getComission(id);
}

function addComission(comission: Comission): Promise<Comission>{
  return repository.addComission(comission);
}

function updateComission(id: string, comission: Partial<Comission>): Promise<Comission | null>{
  return repository.updateComission(id, comission);
}

function deleteComission(id: string): Promise<Comission | null>{
  return repository.deleteComission(id);
}

export default { addComission, getComissions, getComission, updateComission, deleteComission };
