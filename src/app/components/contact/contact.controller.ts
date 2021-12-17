import repository from "./contact.repository";
import { Contact } from "@models/contact.model";


function getContacts(): Promise<Contact[]>{
  return repository.getContacts();
}

function getContact(id: string): Promise<Contact | null>{
  return repository.getContact(id);
}

function addContact(contact: Contact): Promise<Contact>{
  return repository.addContact(contact);
}

function updateContact(id: string, contact: Partial<Contact>): Promise<Contact | null>{
  return repository.updateContact(id, contact);
}

function deleteContact(id: string): Promise<Contact | null>{
  return repository.deleteContact(id);
}

export default { getContacts, getContact, addContact, updateContact, deleteContact }
