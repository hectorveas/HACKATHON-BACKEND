import { User } from "@models/user.model";
import repository from './user.repository';
import authController from '../auth/auth.controller';
import { Auth } from "@models/auth.model";
import profilePictureVerificationController from '../profile-picture-verification/profile-picture-verification.controller';
import propertyController from '../property/property.controller';
import supportController from '../support/support.controller';
import reviewController from '../review/review.controller';
import consultationController from '../consultation/consultation.controller';
import paymentMethodController from '../payment-method/payment-method.controller';
import rentController from '../rent/rent.controller';
import profilePictureVerification from '../profile-picture-verification/index';
import property from '../property/index';
import review from '../review/index';
import consultation from '../consultation/index';
import paymentMethod from '../payment-method/index';
import sgMail from '../../modules/sendGrid.module';
import { v4 as uuidv4 } from 'uuid';


function getUsers(){
  return repository.getUsers();
}

function getUsersByVerification(){
  return repository.getUsersByVerification();
}

async function getUser(userId: string){
  const user: any | null = await repository.getUser(userId);
  const auth: Auth | null = await authController.getAuthByAuthenticated(userId);
  const result = { user, email: auth?.email };
  return result;
}

function addUser(user: User){
  return repository.addUser(user);
}

async function updateUser(id: string, user: User){
  const userUpdated = repository.updateUser(id, user);
  await authController.updateEmail(id, user) 
  return userUpdated;
}

async function updateAverageResponseTime(id: string, time: number){
  return await repository.updateAverageResponseTime(id, time);
}

async function updateProfilePicture(id:string,newImage:string) {
return await repository.updateProfilePicture(id,newImage)
  
}

async function updateProfilePictureVerification(id: string, profilePictureVerification: string) {
  let user: User | null = await repository.getUser(id);
  user!.profilePicture.verification = profilePictureVerification;
  const updated = await repository.updateUser(id, user!);
  const result = { _id: updated!._id, profilePicture: profilePictureVerification };
  return result;
}

async function updateProperty(id: string, property: string) {
  let user: User | null = await repository.getUser(id);
  (user!.properties as string[]).push(property);
  const updated = await repository.updateUser(id, user!);
  const result = { _id: updated!._id, properties: property };
  return result;
}

async function updateSupport(id: string, support: string) {
  let user: User | null = await repository.getUser(id);
  (user!.supports as string[]).push(support);
  const updated = await repository.updateUser(id, user!);
  const result = { _id: updated!._id, supports: support };
  return result;
}

async function updateReview(id: string, review: string) {
  let user: User | null = await repository.getUser(id);
  (user!.reviews as string[]).push(review);
  const updated = await repository.updateUser(id, user!);
  const result = { _id: updated!._id, reviews: review };
  return result;
}

async function updateConsultation(id: string, consultation: string) {
  let user: User | null = await repository.getUser(id);
  (user!.consultations as string[]).push(consultation);
  const updated = await repository.updateUser(id, user!);
  const result = { _id: updated!._id, consultations: consultation };
  return result;
}

async function updatePaymentMethod(id: string, paymentMethod: string) {
  let user: User | null = await repository.getUser(id);
  user!.paymentMethods.push(paymentMethod);
  const updated = await repository.updateUser(id, user!);
  const result = { _id: updated!._id, paymentMethods: paymentMethod };
  return result;
}

async function updateRent(id: string, rent: string) {
  let user: User | null = await repository.getUser(id);
  user!.leasedProperties.push(rent);
  const updated = await repository.updateUser(id, user!);
  const result = { _id: updated!._id, leasedProperties: rent };
  return result;
}

async function changePassword(id: string, newPassword: string){
  return authController.changePassword(id, newPassword);
}

async function addRecoveyCode(email: string) {
  var uuid = uuidv4();     
  uuid = uuid.substring(0,8);
  console.log('este es el code'+uuid)

  await repository.addRecoveryCode(email,uuid);
  const msg: any = {
    to: email,
    from: 'noreply@codefire.cl', // Use the email address or domain you verified above
    subject: 'Código de recuperación',
    text: 'Su código de recuperación es: \n'+ uuid,
  };
  
  try {
    const result: any = await sgMail.sendMail(msg);
    return result;
  } catch (error) {
    console.log(error)
    return 'Internal error'
  }
}

async function checkCode(email: string, newCode:string) {
  try {
    const user: User | null = await repository.getUserByEmail(email)
    if(user){
      if(user.lastCodeVerification.code == newCode){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  }catch(error){
    console.log(error);
    return false;
  }
}

function deleteUserSubscription(id: string){
  return repository.deleteUserSubscription(id);
}

async function deleteUser(id: string) {
  const user: User | null = await repository.getUser(id)
  await authController.deleteAuth(id);
  await profilePictureVerificationController.deleteProfilePictureVerification(user?.profilePicture.verification! as string);
  await propertyController.deleteProperties(user?.properties! as string[]);
  await supportController.deleteSupports(user?.supports! as string[]);
  await reviewController.deleteReviews(user?.reviews! as string[]);
  await consultationController.deleteConsultations(user?.consultations! as string[]);
  await paymentMethodController.deletePaymentMethods(user?.paymentMethods!);
  await rentController.deleteRents(user?.leasedProperties!);
  return repository.deleteUser(id);
}

export default {
  getUsers,
  getUser,
  getUsersByVerification,
  addUser,
  addRecoveyCode,
  checkCode,
  updateUser,
  updateAverageResponseTime,
  updateProfilePicture,
  updateProfilePictureVerification,
  updateProperty,
  updateSupport,
  updateReview,
  updateConsultation,
  updatePaymentMethod,
  updateRent,
  changePassword,
  deleteUserSubscription,
  deleteUser
};
