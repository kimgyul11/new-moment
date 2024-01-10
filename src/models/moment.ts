export interface Moment {
  id: string;
  createdAt: Date;
  hashTag?: string[];
  image: string;
  userId: string;
  text: string;
  likes?: string[];
  likeCount?: number;
}
