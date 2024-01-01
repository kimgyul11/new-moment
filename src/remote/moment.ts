import {
  QuerySnapshot,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import { store } from "./firebase";
import { COLLECTIONS } from "@constants/collections";
import { Moment } from "@models/moment";

//----moments를 가져오는 리모트 함수
export async function getMoments(pageParams?: QuerySnapshot<Moment>) {
  // 1.pageParams에 따라 호출을 구분
  const momentQuery =
    pageParams == null
      ? query(
          collection(store, COLLECTIONS.MOMENTS),
          orderBy("createdAt", "desc"),
          limit(10)
        )
      : query(
          collection(store, COLLECTIONS.MOMENTS),
          orderBy("createdAt", "desc"),
          startAfter(pageParams),
          limit(10)
        );

  //2.가져온 데이터를 꺼내온다.
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

//-----moment를 가져오는 리모트 함수
export async function getMoment(id: string) {
  const snapshot = await getDoc(doc(store, COLLECTIONS.MOMENTS, id));
  return {
    id,
    ...snapshot.data(),
  };
}

//-----베스트 게시물 가져오는 리모트 함수
export async function getBestMoment() {
  const snpashotQuery = query(
    collection(store, COLLECTIONS.MOMENTS),
    orderBy("likeCount", "desc"),
    limit(5)
  );
  const snapshot = await getDocs(snpashotQuery);
  const items = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return items;
}
