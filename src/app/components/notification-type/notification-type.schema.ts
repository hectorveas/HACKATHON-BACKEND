import { Schema, model, Document } from "mongoose";
import { NotificationType } from "@models/notification-type.model";


const definition: Partial<Record<keyof NotificationType, any>> = {
  description: { type: String, required: true, trim: true },
  type: { type: String, required: true, lowercase: true, trim: true }
};

const schema: Schema<NotificationType> = new Schema(definition, { timestamps: true });

export default model<NotificationType & Document>('NotificationType', schema, 'notificationType');
