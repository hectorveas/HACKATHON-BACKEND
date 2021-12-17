import { Admin } from "@models/admin.model";
import repository from './admin.repository';



function getAdmins(): Promise<Admin[]>{
  return repository.getAdmins();
}

function getAdmin(adminId: string): Promise<Admin[]>{
  return repository.getAdmin(adminId);
}

function addAdmin(admin: Admin): Promise<Admin> {
  return repository.addAdmin(admin);
}

function updateAdmin(id: string, admin: Partial<Admin>): Promise<Admin | null>{
  return repository.updateAdmin(id, admin);
}

export default { getAdmins, getAdmin, addAdmin, updateAdmin };
