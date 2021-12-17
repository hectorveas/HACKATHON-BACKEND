import model from './consultation.schema';
import { Consultation } from "@models/consultation.model";

async function getConsultations(): Promise<Consultation[]>{
  return model.find();
}

async function getConsultation(id: string): Promise<Consultation | null>{
  return model.findOne({ _id: id });
}

async function addConsultation(consultation: Consultation): Promise<Consultation>{
  return model.create<Consultation>(consultation);
}

async function addAnswer(id: string, answer: any){
  const consultation: Partial<Consultation> = {
    answer: answer
  }
  return model.findOneAndUpdate({_id: id}, consultation);
}

async function updateConsultation(id: string, consultation: Partial<Consultation>): Promise<Consultation | null>{
  return model.findOneAndUpdate({ _id: id }, consultation);
}

async function deleteConsultation(id: string): Promise<Consultation | null>{
  return model.findOneAndRemove({_id: id});
}

export default { getConsultations, getConsultation, addConsultation, addAnswer, updateConsultation, deleteConsultation };
