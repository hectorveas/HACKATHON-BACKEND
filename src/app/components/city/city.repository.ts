import model from "./city.schema";
import { City } from "@models/city.model";


async function getCitys(): Promise<City[]>{
  return model.find()
    .populate('region');
}

async function getCity(id: string): Promise<City | null>{
  return model.findOne({ _id: id })
    .populate('region');
}

async function addCity(city: City): Promise<City>{
  return model.create<City>(city);
}

async function updateCity(id: string, city: Partial<City>){
  return model.findOneAndUpdate({ _id: id }, city);
}

async function deleteCity(id: string): Promise<City | null>{
  return model.findOneAndRemove({_id: id});
}

async function getCityPerRegion(region: string): Promise<City[]>{
  return model.find({ region: region })
    .populate('region');
}

export default { getCitys, getCity, addCity, updateCity, deleteCity, getCityPerRegion }
