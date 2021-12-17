import repository from "./category.repository";
import { Category } from "@models/category.model";


function getCategories(): Promise<Category[]>{
  return repository.getCategories();
}

function getCategory(id: string): Promise<Category | null>{
  return repository.getCategory(id);
}

function addCategory(category: Category): Promise<Category>{
  return repository.addCategory(category);
}

function updateCategory(id: string, category: Partial<Category>): Promise<Category | null>{
  return repository.updateCategory(id, category);
}

function deleteCategory(id: string): Promise<Category | null>{
  return repository.deleteCategory(id);
}

export default { addCategory, getCategories, getCategory, updateCategory, deleteCategory };
