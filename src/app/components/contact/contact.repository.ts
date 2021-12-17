import model from "./contact.schema";
import { Contact } from "@models/contact.model";


async function getContacts(): Promise<Contact[]>{
  return model.find();
}

async function getContact(id: string): Promise<Contact | null>{
  return model.findOne({ _id: id });
}

async function addContact(contact: Contact): Promise<Contact>{
  return model.create<Contact>(contact);
}

async function updateContact(id: string, contact: Partial<Contact>): Promise<Contact | null>{
  return model.findOneAndUpdate({ _id: id }, contact);
}

async function deleteContact(id: string): Promise<Contact | null>{
  return model.findOneAndRemove({ _id: id });
}

export default { getContacts, getContact, addContact, updateContact, deleteContact }
