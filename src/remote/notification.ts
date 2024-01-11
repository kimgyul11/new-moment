import { Notification } from "@models/notification";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { store } from "./firebase";
import { COLLECTIONS } from "@/constants/collections";

//알림 조회
export async function getNotification({ userId }: { userId: string }) {
  const q = query(
    collection(store, COLLECTIONS.NOTIFICATION),
    where("userId", "==", userId)
  );
  const snapshot = await getDocs(q);

  const notifications = snapshot.docs.map((doc) => {
    const notification = doc.data();
    return {
      id: doc.id,
      ...notification,
      createdAt: notification.createdAt.toDate() as Date,
    } as Notification;
  });

  return notifications;
}

//알림 추가
export function addNotification({
  notification,
}: {
  notification: Omit<Notification, "id">;
}) {
  return addDoc(collection(store, COLLECTIONS.NOTIFICATION), {
    createdAt: notification.createdAt,
    content: notification.content,
    isRead: notification.isRead,
    url: notification.url,
    userId: notification.userId,
  });
}

//알림 삭제
export async function deleteNotification(id: string) {
  const notificationRef = doc(store, COLLECTIONS.NOTIFICATION, id);
  return await deleteDoc(notificationRef);
}

//알림 읽음
export async function readNotification(id: string) {
  const notificationRef = doc(store, COLLECTIONS.NOTIFICATION, id);
  return await updateDoc(notificationRef, {
    isRead: true,
  });
}
