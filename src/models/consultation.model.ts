import { Message } from './message.model';
import { User } from './user.model';

export interface Question {
  user: string | User,
  content: string;
  isNew: boolean;
  date: Date;
}

export interface Answer {
  user: string | User;
  content: string;
  date: Date;
}

export interface Consultation { 
  _id?: string;
  question: Question;
  answer: Answer
  updatedAt?: Date;
  createdAt?: Date;
};
