import {
  QuerySnapshot,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  updateDoc,
  where,
} from "firebase/firestore";
import { storage, store } from "./firebase";
import { COLLECTIONS } from "@constants/collections";
import { Moment } from "@models/moment";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadString,
} from "firebase/storage";

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
  const items = momentsSnapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      } as Moment)
  );

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
  } as Moment;
}

//-----베스트 게시물 가져오는 리모트 함수
export async function getBestMoment() {
  const snpashotQuery = query(
    collection(store, COLLECTIONS.MOMENTS),
    orderBy("likeCount", "desc"),
    limit(8)
  );
  const snapshot = await getDocs(snpashotQuery);
  const items = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return items;
}

//------검색된 moment찾기
export async function getSearchMoment(tag: string) {
  const snapshotQuery = query(
    collection(store, COLLECTIONS.MOMENTS),
    where("hashTag", "array-contains-any", [tag]),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(snapshotQuery);
  const items = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return items;
}

//moment를 작성하는 리모트함수
export async function writeMoment(moment: Omit<Moment, "id">) {
  //1.데이터 타입 매개변수 모델 수정하기 id와 image를 Omit으로 처리

  //-컬렉션에 추가
  const docs = await addDoc(collection(store, COLLECTIONS.MOMENTS), {
    createdAt: moment.createdAt,
    text: moment.text,
    userId: moment.userId,
    hashTag: moment.hashTag,
  });

  //-이미지를 스토리지에 저장
  //string으로 전달받으므로 uploadString으로 처리한다 (profile에서는 uploadBytes로 이미지를 저장했음)
  const storageRef = ref(storage, `moment/${moment.userId}/${docs.id}`);
  const imageUrl = await uploadString(storageRef, moment.image, "data_url");
  const downloadUrl = await getDownloadURL(imageUrl.ref);

  //-스토리지에 저장된 이미지를 가져와서 업데이트
  await updateDoc(docs, {
    image: downloadUrl,
  });
}
