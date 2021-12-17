import repository from "./commune.repository";
import { Commune } from "@models/commune.model";


function getCommunes(): Promise<Commune[]>{
  return repository.getCommunes();
}

function getCommune(id: string): Promise<Commune | null>{
  return repository.getCommune(id);
}

function addCommune(commune: Commune): Promise<Commune>{
  return repository.addCommune(commune);
}

function updateCommune(id: string, commune: Partial<Commune>): Promise<Commune | null>{
  return repository.updateCommune(id, commune);
}

function deleteCommune(id: string): Promise<Commune | null>{
  return repository.deleteCommune(id);
}

export default { getCommunes, getCommune, addCommune, updateCommune, deleteCommune }
