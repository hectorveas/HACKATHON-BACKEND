import { Schema, model, Document, Types } from "mongoose";
import { Message } from "@models/message.model";


const definition: Partial<Record<keyof Message, any>> = {
  message: { type: String, required: true, trim: true },
  user: { type: Types.ObjectId, refPath: 'entity', trim: true }
};

const schema: Schema<Message> = new Schema({
  ...definition, 
  entity: { type: String, required: true, enum: ['Admin', 'User'], trim: true},
}, { timestamps: true });

export default model<Message & Document>('Message', schema, 'message');
