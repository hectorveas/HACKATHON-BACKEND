import { User } from "@models/user.model";
import { userModel, userSchema } from './user.schema';

async function getUsers(): Promise<User[]> {
  return userModel.find()
  /* userModel.paginate({},{page, limit}) */
  // userModel.aggregate([
  //   { 
  //     $lookup: {
  //       from: "auth",
  //       localField: "_id",
  //       foreignField: "authenticated",
  //       as: "user_email"
  //     }
  //   },
  //   { 
  //     $lookup: {
  //       from: "address",
  //       localField: "address",
  //       foreignField: "_id",
  //       as: "address"
  //     }
  //   },
  //   {
  //     $addFields: {
  //       "email": "$user_email.email"
  //     }
  //   },
  //   {
  //     $project: {
  //       "user_email": 0
  //     }
  //   }
  // ])
  /* return userModel */
}

async function getUsersByVerification(): Promise<User[]> {
  return userSchema.find({ 'profilePicture.verification': { $exists: true } })
}

async function getUser(id: string): Promise<User | null> {
  return userSchema.findOne({_id: id});
}

function addUser(user: User){
  return userSchema.create(user);
}

async function addRecoveryCode(email: string, uuid: string) {
  const user: Partial<User> = {
    lastCodeVerification: {
      code: uuid,
      generated_at: new Date
    }
  }
  return userSchema.findOneAndUpdate({ email: email}, user) 
}

async function getUserByEmail(email: string) {
  return userSchema.findOne({ email: email});
}

async function updateUser(id: string, user: Partial<User>): Promise<User | null>{
  return userSchema.findOneAndUpdate({ _id: id }, user);
}

async function updateAverageResponseTime(id: string, time: number){
  const user: Partial<User> = {
    averageResponseTime: time
  }
  return userSchema.findOneAndUpdate({_id: id}, user)
}

async function updateProfilePicture(id:string,newImage:string){
  const idProfilePicture:any  = await getUser(id)
  const user: Partial<User> = {
    profilePicture: {
      imageUrl: newImage,
      verification: idProfilePicture?.profilePicture.verification,
    },
  }
  return userSchema.findOneAndUpdate({ _id: id }, user );
}


async function deleteUserSubscription(id: string): Promise<User | null> {
  return userSchema.findOneAndUpdate(
    { subscription: id }, 
    { 
      $unset: { 
        subscription: ""
      } 
    }
  );
}

async function deleteUser(id: string){
  return userSchema.findOneAndRemove({ _id: id });
}

export default { getUsers, getUser, getUsersByVerification, addUser, addRecoveryCode, getUserByEmail, updateUser, updateAverageResponseTime, updateProfilePicture, deleteUserSubscription, deleteUser };
