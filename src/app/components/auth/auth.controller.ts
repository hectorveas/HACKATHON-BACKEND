import repository from './auth.repository';
import authModule from "../../modules/auth.module";
import { Auth } from '@models/auth.model';
import { User } from '@models/user.model';
import { Admin } from '@models/admin.model';

import userController from '../user/user.controller';
import adminController from '../admin/admin.controller';


async function userSignIn(auth: Auth & User): Promise<Auth>{
  auth.entity = 'User';
  auth.createdAt = new Date();
  auth.updatedAt = auth.createdAt;

  try {
    let newUser: User = auth as User;
    newUser = await userController.addUser(newUser);
    
    if(newUser._id && auth.password){
      auth.authenticated = newUser?._id;
      auth.password = await authModule.encrypt(auth.password);
      return repository.addAuth(auth as Auth);
    }
  }
  catch(error){
    return Promise.reject();
  }
  return Promise.reject();
}

async function adminSignIn(auth: Auth & Admin): Promise<Auth>{
  auth.entity = 'Admin';
  auth.createdAt = new Date();
  auth.updatedAt = auth.createdAt;
  
  try {
    let newAdmin: Admin = auth as Admin;
    newAdmin = await adminController.addAdmin(newAdmin);
    
    if(newAdmin._id && auth.password){
      auth.authenticated = newAdmin?._id;
      auth.password = await authModule.encrypt(auth.password);
      return repository.addAuth(auth as Auth);
    } 
  } 
  catch(error){
    return Promise.reject();
  }
  return Promise.reject();
}

 async function getAuthByEmail(auth: Auth): Promise<Auth | null>{
  return repository.getAuthByEmail(auth.email);
}

async function getAuthByAuthenticated(authenticated: string): Promise<Auth | null> {
  return repository.getAuthByAuthenticated(authenticated);
}

async function updateEmail(id: string, user: any): Promise<Auth | null>{
  return repository.updateEmail(id, user);
}

async function changePassword(id: string, newPassword: string){
  newPassword = await authModule.encrypt(newPassword);
  return repository.changePassword(id, newPassword);
}

async function deleteAuth(id: string){
  return repository.deleteAuth(id);
}

async function login(auth: Auth): Promise<Auth | null>{
  if(auth.email && auth.password){
    
    try {
      const authFound = await getAuthByEmail(auth);
  
      if(authFound && authFound.password){
        if(!(await authModule.decryptAndCompare(auth.password, authFound.password))){
          return Promise.reject();
        }
    
        const { email, entity, authenticated }: any = authFound;
        
        authFound.token = authModule.sign({ 
          email: email, 
          entity: entity, 
          authenticated: authenticated._id
        });

        console.log(authModule.verify(authFound.token))
        return authFound;
      }
    }
    catch (error) {
      return Promise.reject();
    }
  }

  return Promise.reject();
}

export default { userSignIn, adminSignIn, login, getAuthByEmail, getAuthByAuthenticated, updateEmail, changePassword, deleteAuth };
