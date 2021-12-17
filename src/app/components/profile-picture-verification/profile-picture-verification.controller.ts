import repository from "./profile-picture-verification.repository";
import { ProfilePictureVerification } from "@models/profile-picture-verification";
import userController from '../user/user.controller';


function getProfilePictureVerifications(): Promise<ProfilePictureVerification[]>{
  return repository.getProfilePictureVerifications();
}

function getProfilePictureVerification(id: string): Promise<ProfilePictureVerification | null>{
  return repository.getProfilePictureVerification(id);
}

function addProfilePictureVerification(profilePictureVerification: ProfilePictureVerification): Promise<ProfilePictureVerification>{
  return repository.addProfilePictureVerification(profilePictureVerification);
}

async function addUserProfilePictureVerification(newUrl: ProfilePictureVerification, id: string): Promise<ProfilePictureVerification>{
  const result = await repository.addProfilePictureVerification(newUrl);
  await userController.updateProfilePictureVerification(id, result._id!);
  return result;
}

function updateProfilePictureVerification(id: string, profilePictureVerification: Partial<ProfilePictureVerification>): Promise<ProfilePictureVerification | null>{
  return repository.updateProfilePictureVerification(id, profilePictureVerification);
}

function deleteProfilePictureVerification(id: string): Promise<ProfilePictureVerification | null>{
  return repository.deleteProfilePictureVerification(id);
}

export default { addProfilePictureVerification, addUserProfilePictureVerification, getProfilePictureVerifications, getProfilePictureVerification, updateProfilePictureVerification, deleteProfilePictureVerification };
