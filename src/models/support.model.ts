import { Message } from './message.model';
import { User } from './user.model';
export interface Support {
_id?: string;
ticketNumber?: string;
issue: string;
user: string | User;
messages: string[] | Message[];
state: string;
description: string;
updatedAt?: Date;
createdAt?: Date;
};