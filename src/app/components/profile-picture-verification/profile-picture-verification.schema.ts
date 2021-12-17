import { Schema, model, Document } from "mongoose";
import { ProfilePictureVerification } from "@models/profile-picture-verification";


const definition: Partial<Record<keyof ProfilePictureVerification, any>> = {
  frontIdentityCardUrl: { type: String, required: true, trim: true },
  backIdentityCardUrl: { type: String, required: true, trim: true },
  faceUrl: { type: String, required: true, trim: true },
  verified: { type: Boolean },
  verifiedAt: { type: Date }
};

const schema: Schema<ProfilePictureVerification> = new Schema(definition, { timestamps: true });

export default model<ProfilePictureVerification & Document>('ProfilePictureVerification', schema, 'profilePictureVerification');
