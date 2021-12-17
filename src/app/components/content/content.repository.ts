import model from './content.schema';
import { Content } from "@models/content.model";


async function getContents(): Promise<Content[]>{
  return model.find();
}

async function getContentsByType(type: string): Promise<Content[]>{
  return model.find({ type });
}

async function getContent(id: string): Promise<Content | null>{
  return model.findOne({ _id: id });
}

async function addContent(content: Content): Promise<Content>{
  return model.create<Content>(content);
}

async function updateContent(id: string, content: Partial<Content>): Promise<Content | null>{
  return model.findOneAndUpdate({ _id: id }, content);
}

async function deleteContent(id: string): Promise<Content | null>{
  return model.findOneAndRemove({_id: id});
}

export default {  getContents, getContent, getContentsByType, addContent, updateContent, deleteContent };
