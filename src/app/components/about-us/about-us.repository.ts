import model from './about-us.schema';
import { AboutUs } from "@models/about-us.model";


async function getAboutUss(): Promise<AboutUs[]>{
  return model.find();
}

async function getContentByType(type: string): Promise<AboutUs[]>{
  return model.find({ type });
}

async function getAboutUs(id: string): Promise<AboutUs | null>{
  return model.findOne({ _id: id });
}

async function addAboutUs(aboutUs: AboutUs): Promise<AboutUs>{
  return model.create<AboutUs>(aboutUs);
}

async function updateAboutUs(id: string, aboutUs: Partial<AboutUs>): Promise<AboutUs | null>{
  return model.findOneAndUpdate({ _id: id }, aboutUs);
}

async function deleteAboutUs(id: string): Promise<AboutUs | null>{
  return model.findOneAndRemove({_id: id});
}

export default { getAboutUss, getAboutUs, getContentByType, addAboutUs, updateAboutUs, deleteAboutUs };
