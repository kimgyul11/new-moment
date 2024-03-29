import {
  QuerySnapshot,
  addDoc,
  collection,
  deleteDoc,
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
  deleteObject,
  getDownloadURL,
  ref,
  uploadString,
} from "firebase/storage";

//Moments조회
export async function getMoments(pageParams?: QuerySnapshot<Moment>) {
  // 1.pageParams에 따라 호출을 구분
  const momentQuery =
    pageParams == null
      ? query(
          collection(store, COLLECTIONS.MOMENTS),
          orderBy("createdAt", "desc"),
          limit(5)
        )
      : query(
          collection(store, COLLECTIONS.MOMENTS),
          orderBy("createdAt", "desc"),
          startAfter(pageParams),
          limit(5)
        );
  //2.가져온 데이터를 꺼내온다.
  const momentsSnapshot = await getDocs(momentQuery);
  const items = momentsSnapshot.docs.map((doc) => {
    const moment = doc.data();
    return {
      id: doc.id,
      ...moment,
      createdAt: moment.createdAt.toDate() as Date,
    } as Moment;
  });

  //3. 마지막 페이지를 알려준다.
  const lastVisible = momentsSnapshot.docs[momentsSnapshot.docs.length - 1];

  return {
    items,
    lastVisible,
  };
}

//좋아요한 moments
export async function getLikeMoments(
  userId: string,
  pageParams?: QuerySnapshot<Moment>
) {
  const momentQuery =
    pageParams == null
      ? query(
          collection(store, COLLECTIONS.MOMENTS),
          where("likes", "array-contains", userId),
          orderBy("createdAt", "desc"),
          limit(5)
        )
      : query(
          collection(store, COLLECTIONS.MOMENTS),
          where("likes", "array-contains", userId),
          orderBy("createdAt", "desc"),
          startAfter(pageParams),
          limit(5)
        );

  const momentsSnapshot = await getDocs(momentQuery);
  const items = momentsSnapshot.docs.map((doc) => {
    const moment = doc.data();
    return {
      id: doc.id,
      ...moment,
      createdAt: moment.createdAt.toDate() as Date,
    } as Moment;
  });

  const lastVisible = momentsSnapshot.docs[momentsSnapshot.docs.length - 1];

  return {
    items,
    lastVisible,
  };
}

//팔로잉한 moments
export async function getFollowingMoments(
  followingIds: string[],
  pageParams?: QuerySnapshot<Moment>
) {
  const momentQuery =
    pageParams == null
      ? query(
          collection(store, COLLECTIONS.MOMENTS),
          where("userId", "in", followingIds),
          orderBy("createdAt", "desc"),
          limit(5)
        )
      : query(
          collection(store, COLLECTIONS.MOMENTS),
          where("userId", "in", followingIds),
          orderBy("createdAt", "desc"),
          startAfter(pageParams),
          limit(5)
        );
  const momentsSnapshot = await getDocs(momentQuery);
  const items = momentsSnapshot.docs.map((doc) => {
    const moment = doc.data();
    return {
      id: doc.id,
      ...moment,
      createdAt: moment.createdAt.toDate() as Date,
    } as Moment;
  });

  const lastVisible = momentsSnapshot.docs[momentsSnapshot.docs.length - 1];

  return {
    items,
    lastVisible,
  };
}

//searchMoment조회
export async function getSearchMoment(
  tag: string,
  pageParams?: QuerySnapshot<Moment>
) {
  const snapshotQuery =
    pageParams == null
      ? query(
          collection(store, COLLECTIONS.MOMENTS),
          where("hashTag", "array-contains-any", [tag]),
          orderBy("createdAt", "desc"),
          limit(5)
        )
      : query(
          collection(store, COLLECTIONS.MOMENTS),
          where("hashTag", "array-contains-any", [tag]),
          orderBy("createdAt", "desc"),
          startAfter(pageParams),
          limit(5)
        );
  const snapshot = await getDocs(snapshotQuery);
  const items = snapshot.docs.map((doc) => {
    const moment = doc.data();
    return {
      id: doc.id,
      ...moment,
      createdAt: moment.createdAt.toDate() as Date,
    } as Moment;
  });
  const lastVisible = snapshot.docs[snapshot.docs.length - 1];

  return { items, lastVisible };
}

//Moment조회
export async function getMoment(id: string) {
  const momentRef = doc(store, COLLECTIONS.MOMENTS, id);
  const snapshot = await getDoc(momentRef);
  const moment = snapshot.data();
  return {
    id,
    ...moment,
    createdAt: moment?.createdAt.toDate() as Date,
  } as Moment;
}

//BestMoments
export async function getBestMoment() {
  const snpashotQuery = query(
    collection(store, COLLECTIONS.MOMENTS),
    orderBy("likeCount", "desc"),
    limit(5)
  );
  const snapshot = await getDocs(snpashotQuery);
  const items = snapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      } as Moment)
  );
  return items;
}

//Moment 작성
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

//Moment 삭제
export async function removeMoment({
  momentId,
  userId,
}: {
  momentId: string;
  userId: string;
}) {
  const momentRef = doc(store, COLLECTIONS.MOMENTS, momentId);
  const imageRef = ref(storage, `moment/${userId}/${momentId}`);
  await deleteObject(imageRef);
  return deleteDoc(momentRef);
}

//moment 수정
export async function updateMoment({
  momentObj,
  isNotUpdated,
}: {
  momentObj: Pick<Moment, "text" | "image" | "hashTag" | "id" | "userId">;
  isNotUpdated: boolean;
}) {
  const momentRef = doc(store, COLLECTIONS.MOMENTS, momentObj.id);
  const imageRef = ref(storage, `moment/${momentObj.userId}/${momentObj.id}`);

  //이미지 변경되었을 경우 삭제후 재 업로드
  if (!isNotUpdated) {
    await deleteObject(imageRef);
    const storageRef = ref(
      storage,
      `moment/${momentObj.userId}/${momentObj.id}`
    );
    const imageUrl = await uploadString(
      storageRef,
      momentObj.image,
      "data_url"
    );
    const downloadUrl = await getDownloadURL(imageUrl.ref);

    await updateDoc(momentRef, {
      image: downloadUrl,
    });
  }

  await updateDoc(momentRef, {
    text: momentObj.text,
    hashTag: momentObj.hashTag,
  });
}
