import repository from "./city.repository";
import { City } from "@models/city.model";


function getCitys(): Promise<City[]>{
  return repository.getCitys();
}

function getCity(id: string): Promise<City | null>{
  return repository.getCity(id);
}

function addCity(city: City): Promise<City>{
  city.name = city.name.toLowerCase();
  city.createdAt = new Date();
  city.updatedAt = city.createdAt;
  return repository.addCity(city);
}

function updateCity(id: string, city: Partial<City>): Promise<City | null>{
  if(city.name){
    city.name = city.name.toLowerCase();
  }
  
  city.updatedAt = new Date();
  
  return repository.updateCity(id, city);
}

function deleteCity(id: string): Promise<City | null>{
  return repository.deleteCity(id);
}

export default { getCitys, getCity, addCity, updateCity, deleteCity }
