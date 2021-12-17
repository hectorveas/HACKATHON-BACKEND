import repository from "./property.repository";
import { Property } from "@models/property.model";
import locationController from "./../location/location.controller";
import reviewController from "./../review/review.controller"
import userController from "../user/user.controller";
import * as geolib from 'geolib';

async function getProperties(property:any ,limit: number, page: number){
  const propertyMap = await repository.getProperties(property,limit,page)
  if (property.lat != undefined && property.lng != undefined){ 
  let arrayMap: any=[]
  propertyMap.map((e: any)=>{
    try{
       if( geolib.isPointWithinRadius(
        { latitude: parseFloat(e.location.latitude), longitude: parseFloat(e.location.longitude) },
        { latitude: property.lat, longitude: property.lng },        
        1000
    ) === true){
      
      return arrayMap.push(e)
    }
  }catch(err){
    console.log(err)}
  })
  console.log(arrayMap)
  return arrayMap
}else{
  return propertyMap
}
    
}

function getPropertiesByType(type: string, limit: number, page: number): Promise<Property[]>{
  return repository.getPropertiesByType(type, limit, page);
}

function getProperty(id: string): Promise<Property | null>{
  return repository.getProperty(id);
}
async function addProperty(property: Property): Promise<Property>{
  return repository.addProperty(property);
}
async function addPropertySearch( property: any){
  const varMap = await repository.addPropertySearch(property)
  let arrayMap: any=[]
  varMap.map((e: any)=>{
    try{
       if( geolib.isPointWithinRadius(
        { latitude: parseFloat(e.location.latitude), longitude: parseFloat(e.location.longitude) },
        { latitude: property.lat, longitude: property.long },        
        5000
    ) === true){
      return arrayMap.push(e)
    }
  }catch(err){
    console.log(err)}
  })
/*   console.log(arrayMap) */
  return arrayMap
}

async function addUserProperty(property: Property, id: string): Promise<Property>{
  const result = await repository.addProperty(property);
  await userController.updateProperty(id, result._id!);
  return result;
}

async function updateProperty(id: string, property: Partial<Property>): Promise<Property | null>{
  let propertyState = await repository.getProperty(id);
  const state = propertyState?.state
  if (property.state === "accepted"|| "rejected"|| "pending" || "deleted"){
  switch (property.state){
    case "accepted":
      if(property.state != state){
      return repository.updateProperty(id, property);
    }break;
    case "rejected":
      if(property.state != state){
        return repository.updateProperty(id, property);
      }break;
    case "pending":
      if(property.state != state){
        return repository.updateProperty(id, property);
      }break;
    case "deleted":
      if(property.state != state){
        return repository.updateProperty(id, property);
      }break;
    default:
      console.log("default")  
    
    }
    return repository.updateProperty(id, property);
         
  } 
  return null ;

}

async function updateLocationProperty(id: string, location: { location: string }  ) {
  return await repository.updateLocationProperty(id, location);
}
async function updateReviewProperty(id: string,review : { review: string[] }) {
  return await repository.updateReviewProperty(id,review);
}

async function deleteProperty(id: string): Promise<Property | null>{
  const property: Property | null = await getProperty(id);
  await locationController.deleteLocation(property?.location! as string);
  await reviewController.deleteReviews(property?.reviews! as string[]);
  return repository.deleteProperty(id);
}

async function deleteProperties(id: string[]): Promise<Property[] | null> {
  let result: Property[] | null= [];
  for (let current of id) {
    const deleted = await deleteProperty(current!)
    result.push(deleted!);
  }
  return result;
}



export default { addProperty, getPropertiesByType, addUserProperty,addPropertySearch, getProperties, getProperty, updateProperty, updateReviewProperty,updateLocationProperty, deleteProperty, deleteProperties };
