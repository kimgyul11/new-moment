import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { store } from "./firebase";
import { COLLECTIONS } from "@/constants/collections";

//팔로잉
export async function followingAction({
  userId,
  followingId,
}: {
  userId: string;
  followingId: string;
}) {
  //1.로그인한 유저를 기준으로 팔로잉컬렉션을 생성
  const followingRef = doc(store, COLLECTIONS.FOLLOWING, userId);
  await setDoc(
    followingRef,
    { users: arrayUnion({ id: followingId }) },
    { merge: true }
  );

  //2.moment 작성한 유저를 기준으로 팔로워 컬렉션을 작성 (팔로우 표시를 위해)
  const followerRef = doc(store, COLLECTIONS.FOLLOWER, followingId);
  await setDoc(
    followerRef,
    { users: arrayUnion({ id: userId }) },
    { merge: true }
  );
}

//팔로워 조회
export async function getFollowers({ momentWriter }: { momentWriter: string }) {
  const FollowerRef = doc(store, COLLECTIONS.FOLLOWER, momentWriter);
  const snapshot = await getDoc(FollowerRef);

  return snapshot.data();
}

//팔로잉 취소
export async function cancleFollowing({
  userId,
  followingId,
}: {
  userId: string;
  followingId: string;
}) {
  //1.following 컬렉션에서 팔로잉하는 유저 삭제
  const followingRef = doc(store, COLLECTIONS.FOLLOWING, userId);
  await updateDoc(followingRef, {
    users: arrayRemove({ id: followingId }),
  });
  //2.follower 컬렉션에서 팔로우하는 유저 삭제
  const followerRef = doc(store, COLLECTIONS.FOLLOWER, followingId);
  await updateDoc(followerRef, {
    users: arrayRemove({ id: userId }),
  });
}

//팔로잉 목록 가져오기
export async function getFollowingIds({
  userId,
}: {
  userId: string | undefined;
}) {
  if (!userId) return [""];
  const ref = doc(store, COLLECTIONS.FOLLOWING, userId);
  const snapshot = await getDoc(ref);
  const result: string[] = [];
  if (snapshot.data()?.users.length > 0) {
    snapshot.data()?.users.map((user: { id: string }) => result.push(user.id));
  }
  return result;
}
