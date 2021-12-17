import model from './plan.schema';
import { Plan } from "@models/plan.model";


async function getPlans(): Promise<Plan[]>{
  return model.find();
}

async function getPlan(id: string): Promise<Plan | null>{
  return model.findOne({ _id: id });
}

async function addPlan(plan: Plan): Promise<Plan>{
  return model.create<Plan>(plan);
}

async function updatePlan(id: string, plan: Partial<Plan>): Promise<Plan | null>{
  return model.findOneAndUpdate({ _id: id }, plan);
}

async function deletePlan(id: string): Promise<Plan | null>{
  return model.findOneAndRemove({_id: id});
}

export default { getPlans, getPlan, addPlan, updatePlan, deletePlan };
