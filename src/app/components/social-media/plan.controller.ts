import repository from "./plan.repository";
import { Plan } from "@models/plan.model";


function getPlans(): Promise<Plan[]>{
  return repository.getPlans();
}

function getPlan(id: string): Promise<Plan | null>{
  return repository.getPlan(id);
}

function addPlan(plan: Plan): Promise<Plan>{
  plan.name = plan.name.toLowerCase();
  plan.monthlyPublications = plan.monthlyPublications.toLowerCase();

  plan.createdAt = new Date();
  plan.updatedAt = plan.createdAt;
  return repository.addPlan(plan);
}

function updatePlan(id: string, plan: Partial<Plan>): Promise<Plan | null>{
  if(plan.name){
    plan.name = plan.name.toLowerCase();
  }

  if(plan.monthlyPublications){
    plan.monthlyPublications = plan.monthlyPublications.toLowerCase();
  }
 
  plan.updatedAt = new Date();
  return repository.updatePlan(id, plan);
}

function deletePlan(id: string): Promise<Plan | null>{
  return repository.deletePlan(id);
}

export default { addPlan, getPlans, getPlan, updatePlan, deletePlan };
