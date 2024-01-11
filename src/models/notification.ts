export interface Notification {
  id: string;
  content: string;
  createdAt: Date;
  isRead: boolean;
  url: string;
  userId: string;
}
