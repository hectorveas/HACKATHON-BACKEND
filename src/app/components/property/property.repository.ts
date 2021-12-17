import {propertySchema, propertyModel} from './property.schema';
import { Property } from "@models/property.model";


async function getProperties(property:any,limit: number, page: number){ 
    if(property.lat != undefined && property.lng != undefined){
    const propertyFind = await propertyModel.find()
    return propertyFind
  }else{
    return propertyModel.paginate({},{page, limit});
  }

    
}

async function getPropertiesByType(type: string, limit: number, page: number): Promise<Property[]>{
  return propertyModel.paginate({ propertyType: type },{page, limit});
}

async function getProperty(id: string): Promise<Property | null>{
  return propertySchema.findOne({ _id: id });
}

async function addProperty(property: Property): Promise<Property>{
  return propertySchema.create<Property>(property);
}
async function addPropertySearch( property: any){
  if(property.propertyType ){
    const varFind = await propertyModel.find({ $or: [ { "height": {$lte: property.mts}}, { "length": {$lte:property.mts}},{ "width": {$lte:property.mts}},{$and:{"heigth":{$exists: false},"length":{$exists:false},"width":{$exists:false}} }]} && {  propertyType: property.propertyType  } && {state: property.state})
    return varFind
  }else{
    const varFindAny = await propertyModel.find({ $or: [ { "height": {$lte: property.mts}}, { "length": {$lte:property.mts}},{ "width": {$lte:property.mts}},{$and:{"heigth":{$exists: false},"length":{$exists:false},"width":{$exists:false}} }]} && {state: property.state})

  return varFindAny
  }
}

async function updateProperty(id: string, property: Partial<Property>): Promise<Property | null>{
  return propertySchema.findOneAndUpdate({ _id: id }, property);
}
async function updateReviewProperty(id: string, review : { review: string[] }){
  return propertySchema.findOneAndUpdate({ _id: id }, review);
}

async function updateLocationProperty(id: string, location: { location: string }){
  return propertySchema.findOneAndUpdate({ _id: id }, location);
}
async function deleteProperty(id: string): Promise<Property | null>{
  return propertySchema.findOneAndRemove({_id: id});
}

export default { getProperties, getPropertiesByType, getProperty, addProperty,addPropertySearch, updateProperty,updateReviewProperty,updateLocationProperty, deleteProperty };
