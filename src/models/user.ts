import { Comment } from "./comment";

export interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
}

export interface CommentWithUser extends Comment {
  user: User;
}
