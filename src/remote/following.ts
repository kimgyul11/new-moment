import { arrayUnion, doc, getDoc, setDoc } from "firebase/firestore";
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
export async function getFollowers(momentWriter: string) {
  const FollowerRef = doc(store, COLLECTIONS.FOLLOWER, momentWriter);
  const snapshot = await getDoc(FollowerRef);

  return snapshot.data();
}
