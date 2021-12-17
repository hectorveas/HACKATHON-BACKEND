import repository from "./content.repository";
import { Content } from "@models/content.model";


function getContents(): Promise<Content[]>{
  return repository.getContents();
}

function getContentsByType(type: string): Promise<Content[]>{
  return repository.getContentsByType(type);
}

function getContent(id: string): Promise<Content | null>{
  return repository.getContent(id);
}

function addContent(content: Content): Promise<Content>{
  return repository.addContent(content);
}

function updateContent(id: string, content: Partial<Content>): Promise<Content | null>{
  return repository.updateContent(id, content);
}

function deleteContent(id: string): Promise<Content | null>{
  return repository.deleteContent(id);
}

export default { addContent, getContents, getContentsByType, getContent, updateContent, deleteContent };
