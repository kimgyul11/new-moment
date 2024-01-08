export interface Moment {
  id: string;
  createdAt: string;
  hashTag?: string[];
  image: string;
  userId: string;
  text: string;
  likes?: string[];
  likeCount?: number;
}
