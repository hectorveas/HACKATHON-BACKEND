import repository from "./term.repository";
import { Term } from "@models/term.model";


function getTerms(): Promise<Term[]>{
  return repository.getTerms();
}

function getTerm(id: string): Promise<Term | null>{
  return repository.getTerm(id);
}

function addTerm(term: Term): Promise<Term>{
  return repository.addTerm(term);
}

function updateTerm(id: string, term: Partial<Term>): Promise<Term | null>{
  return repository.updateTerm(id, term);
}

function deleteTerm(id: string): Promise<Term | null>{
  return repository.deleteTerm(id);
}

export default { addTerm, getTerms, getTerm, updateTerm, deleteTerm };
