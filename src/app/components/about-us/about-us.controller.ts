import repository from "./about-us.repository";
import { AboutUs } from "@models/about-us.model";


function getAboutUss(): Promise<AboutUs[]>{
  return repository.getAboutUss();
}

function getContentByType(type: string): Promise<AboutUs[]>{
  return repository.getContentByType(type);
}

function getAboutUs(id: string): Promise<AboutUs | null>{
  return repository.getAboutUs(id);
}

function addAboutUs(aboutUs: AboutUs): Promise<AboutUs>{
  return repository.addAboutUs(aboutUs);
}

function updateAboutUs(id: string, aboutUs: Partial<AboutUs>): Promise<AboutUs | null>{
  return repository.updateAboutUs(id, aboutUs);
}

function deleteAboutUs(id: string): Promise<AboutUs | null>{
  return repository.deleteAboutUs(id);
}

export default { addAboutUs, getAboutUss, getContentByType, getAboutUs, updateAboutUs, deleteAboutUs };
