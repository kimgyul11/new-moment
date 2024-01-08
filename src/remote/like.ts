import { COLLECTIONS } from "@/constants/collections";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { store } from "./firebase";
import { Moment } from "@/models/moment";

export async function getLike({ momentId }: { momentId: string }) {
  const likeRef = doc(store, COLLECTIONS.MOMENTS, momentId);
  const snapshot = await getDoc(likeRef);

  return snapshot.data() as Moment;
}

export async function removeLike({
  userId,
  momentId,
  likeCount,
}: {
  userId: string;
  momentId: string;
  likeCount: number;
}) {
  const momentRef = doc(store, COLLECTIONS.MOMENTS, momentId);
  await updateDoc(momentRef, {
    likes: arrayRemove(userId),
    likeCount: likeCount > 0 ? likeCount - 1 : 0,
  });
}

export async function addLike({
  userId,
  momentId,
  likeCount,
}: {
  userId: string;
  momentId: string;
  likeCount: number;
}) {
  const momentRef = doc(store, COLLECTIONS.MOMENTS, momentId);
  await updateDoc(momentRef, {
    likes: arrayUnion(userId),
    likeCount: likeCount === 0 ? 1 : likeCount + 1,
  });
}
