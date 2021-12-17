import repository from "./message.repository";
import { Message } from "@models/message.model";
import consultationController from '../consultation/consultation.controller';
import supportController from '../support/support.controller';


function getMessages(): Promise<Message[]>{
  return repository.getMessages();
}

function getMessage(id: string): Promise<Message | null>{
  return repository.getMessage(id);
}

function addMessage(message: Message): Promise<Message>{
  return repository.addMessage(message);
}

async function addSupportMessage(message: Message, id: string): Promise<Message> {
  const result = await repository.addMessage(message);
  let support = await supportController.getSupport(id);
  if (result._id) (support?.messages as string[]).push(result._id!);
  await supportController.updateSupport(support!._id!,support!);
  return result;
}

async function addConsultationMessage(message: Message, id: string): Promise<Message> {
  const result = await repository.addMessage(message);
  /*let consultation = await consultationController.getConsultation(id);
  if (result._id) (consultation?.messages as string[]).push(result._id!);
  await consultationController.updateConsultation(consultation!._id!,consultation!);*/
  return result;
}

function updateMessage(id: string, message: Partial<Message>): Promise<Message | null>{
  return repository.updateMessage(id, message);
}

function deleteMessage(id: string): Promise<Message | null>{
  return repository.deleteMessage(id);
}

function deleteMessages(id: string[]): Promise<Message | null>{
  return repository.deleteMessages(id);
}


export default { addMessage, getMessages, getMessage, updateMessage, deleteMessage, deleteMessages, addSupportMessage, addConsultationMessage };
