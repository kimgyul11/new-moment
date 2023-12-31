import {
  QuerySnapshot,
  collection,
  getDocs,
  limit,
  query,
  startAfter,
} from "firebase/firestore";
import { store } from "./firebase";
import { COLLECTIONS } from "@constants/collections";
import { Moment } from "@models/moment";

export async function getMoments(pageParams?: QuerySnapshot<Moment>) {
  // 1.pageParams에 따라 호출을 구분
  const momentQuery =
    pageParams == null
      ? query(collection(store, COLLECTIONS.MOMENTS), limit(10))
      : query(
          collection(store, COLLECTIONS.MOMENTS),
          startAfter(pageParams),
          limit(10)
        );

  //2.가져온 데이터를 풀어준다.
  const momentsSnapshot = await getDocs(momentQuery);
  const items = momentsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  //3. 마지막 페이지를 알려준다.
  const lastVisible = momentsSnapshot.docs[momentsSnapshot.docs.length - 1];

  return {
    items,
    lastVisible,
  };
}
