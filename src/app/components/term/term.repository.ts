import model from './term.schema';
import { Term } from "@models/term.model";


async function getTerms(): Promise<Term[]>{
  return model.find();
}

async function getTerm(id: string): Promise<Term | null>{
  return model.findOne({ _id: id });
}

async function addTerm(term: Term): Promise<Term>{
  return model.create<Term>(term);
}

async function updateTerm(id: string, term: Partial<Term>): Promise<Term | null>{
  return model.findOneAndUpdate({ _id: id }, term);
}

async function deleteTerm(id: string): Promise<Term | null>{
  return model.findOneAndRemove({_id: id});
}

export default { getTerms, getTerm, addTerm, updateTerm, deleteTerm };
