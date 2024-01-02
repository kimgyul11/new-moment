import { User } from "./user";

export interface Moment {
  id: string;
  createdAt: string;
  comment?: Comment[];
  hashTag?: string[];
  photo: string;
  userId: string;
  text: string;
}

interface Comment {
  comment: string;
  commentId: string;
  createdAt: Date;
  nickname: string;
}
