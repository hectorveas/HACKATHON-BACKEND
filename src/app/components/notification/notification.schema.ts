import { Document, Schema, model, Types } from "mongoose";
import { Notification } from "@models/notification.model";

const definition: Partial<Record<keyof Notification, any>> = {
  type: { type: Schema.Types.ObjectId , ref: 'NotificationType', required: true, trim: true },
  entity: { type: Types.ObjectId, required: true, trim: true },
  reference: { type: String, required: true, trim: true },
  url: { type: String, trim: true },
  viewed: { type: Boolean, required: true }
};

const schema: Schema<Notification> = new Schema(definition, { timestamps: true });

export default model<Notification & Document>('Notification', schema, 'notification');
