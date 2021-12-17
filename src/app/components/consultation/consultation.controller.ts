import repository from "./consultation.repository";
import { Consultation } from "@models/consultation.model";
import controller from "./../message/message.controller"
import propertyController from '../property/property.controller';
import userController from '../user/user.controller';
import { Answer } from "@models/consultation.model"


function getConsultations(): Promise<Consultation[]>{
  return repository.getConsultations();
}

function getConsultation(id: string): Promise<Consultation | null>{
  return repository.getConsultation(id);
}

function addConsultation(consultation: Consultation): Promise<Consultation>{
  return repository.addConsultation(consultation);
}

async function addAnswer(id: string, answer: Answer){
  const result: any = await repository.addAnswer(id, answer);
  const consultations: any[] = await repository.getConsultations();

  let contador = 0;
  let value = 0
  let otrovalor = 0;
  
  for(let i=0; i < consultations.length; i++){
    if(consultations[i].answer.user._id == answer.user){
      value = consultations[i].answer.date - consultations[i].question.date; //milisegundos
      otrovalor= otrovalor + value;
      contador++;
    }
  }
  let promedio = otrovalor/contador;
  promedio = Math.round(promedio/60000);

  await userController.updateAverageResponseTime(answer.user as any, promedio)
  return result;
}

async function addPropertyConsultation(consultation: Consultation, id: string): Promise<Consultation>{
  const result: Consultation = await repository.addConsultation(consultation);
  let property = await propertyController.getProperty(id);
  if (result._id) (property?.consultations as string[])?.push(result._id!);
  await propertyController.updateProperty(property!._id!,property!);
  return result;  
}

async function addUserConsultation(consultation: Consultation, id: string): Promise<Consultation>{
  const result = await repository.addConsultation(consultation);
  await userController.updateConsultation(id, result._id!);
  return result;
}

function updateConsultation(id: string, consultation: Partial<Consultation>): Promise<Consultation | null>{
  return repository.updateConsultation(id, consultation);
}

async function deleteConsultation(id: string): Promise<Consultation | null>{
  // const consultationTicket: Consultation | null = await getConsultation(id);
  // controller.deleteMessages(consultationTicket?.messages! as string[]);
  return repository.deleteConsultation(id);
}

async function deleteConsultations(id: string[]): Promise<Consultation[] | null>{
  let result: Consultation[] | null= [];
  for (let current of id) {
    const deleted = await deleteConsultation(current!)
    result.push(deleted!);
  }
  return result;
}




export default { addConsultation, addPropertyConsultation, addUserConsultation, addAnswer, getConsultations, getConsultation, updateConsultation, deleteConsultation, deleteConsultations };