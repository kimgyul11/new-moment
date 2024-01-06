//like 가져오기

import { COLLECTIONS } from "@/constants/collections";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { store } from "./firebase";

//user가 like를 눌렀는지 확인.
export async function getLikes({ momentId }: { momentId: string }) {
  const momentRef = doc(store, COLLECTIONS.MOMENTS, momentId);
  const likeQuery = query(
    collection(momentRef, COLLECTIONS.LIKE),
    where("momentId", "==", momentId)
  );

  const snapshot = await getDocs(likeQuery);
  const likes = snapshot.docs.map((doc) => ({
    ...doc.data(),
  }));

  return likes;
}

//likeToggle
