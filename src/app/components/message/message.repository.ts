import model from './message.schema';
import { Message } from "@models/message.model";


async function getMessages(): Promise<Message[]>{
  return model.find();
}

async function getMessage(id: string): Promise<Message | null>{
  return model.findOne({ _id: id });
}

async function addMessage(message: Message): Promise<Message>{
  return model.create<Message>(message);
}

async function updateMessage(id: string, message: Partial<Message>): Promise<Message | null>{
  return model.findOneAndUpdate({ _id: id }, message);
}

async function deleteMessage(id: string): Promise<Message | null>{
  return model.findOneAndRemove({_id: id});
}

async function deleteMessages(ids: string[]): Promise<Message | null>{
  return model.deleteMany({_id: { $in: ids} });
}

export default { getMessages, getMessage, addMessage, updateMessage, deleteMessage, deleteMessages };
