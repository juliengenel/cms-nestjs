import { Document } from 'mongoose';

export interface Article extends Document {
  title: string;
  content: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
}
