import model from './profile-picture-verification.schema';
import { ProfilePictureVerification } from "@models/profile-picture-verification";


async function getProfilePictureVerifications(): Promise<ProfilePictureVerification[]>{
  return model.find();
}

async function getProfilePictureVerification(id: string): Promise<ProfilePictureVerification | null>{
  return model.findOne({ _id: id });
}

async function addProfilePictureVerification(newUrl: any): Promise<ProfilePictureVerification>{
  console.log(newUrl)
  const profilePictureVerificationUrl: ProfilePictureVerification= {
    frontIdentityCardUrl: newUrl[0],
    backIdentityCardUrl: newUrl[1],
    faceUrl: newUrl[2],
  }
  return model.create<ProfilePictureVerification>(profilePictureVerificationUrl);
}

async function updateProfilePictureVerification(id: string, profilePictureVerification: Partial<ProfilePictureVerification>): Promise<ProfilePictureVerification | null>{
  return model.findOneAndUpdate({ _id: id }, profilePictureVerification);
}

async function deleteProfilePictureVerification(id: string): Promise<ProfilePictureVerification | null>{
  return model.findOneAndRemove({_id: id});
}

export default { getProfilePictureVerifications, getProfilePictureVerification, addProfilePictureVerification, updateProfilePictureVerification, deleteProfilePictureVerification };
