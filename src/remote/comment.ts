import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { store } from "./firebase";
import { COLLECTIONS } from "@/constants/collections";
import { Comment } from "@/models/comment";
import { User } from "@/models/user";

//Comment 조회
export async function getComments({ momentId }: { momentId: string }) {
  //1.경로와 쿼리 지정
  const commentRef = doc(store, COLLECTIONS.MOMENTS, momentId);

  const commentQuery = query(
    collection(commentRef, COLLECTIONS.COMMENT),
    orderBy("createdAt", "desc")
  );

  //2.데이터 가져오기
  const snapshot = await getDocs(commentQuery);

  //3.데이터 꺼내기
  const comments = snapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    } as Comment;
  });

  //4.중복된 유저를 캐시하여 관리
  //4-1.유저 저장을 위한 객체 정의
  const userMap: {
    [key: string]: User;
  } = {};

  //4-2.Comment,User를 갖는 결과 배열을 정의
  const results: Array<Comment & { user: User }> = [];

  //4-3for of를 돌면서 체크
  for (let comment of comments) {
    const cashingUser = userMap[comment.userId];

    //1.캐시된 유저가 없을 경우
    if (cashingUser == null) {
      //유저 컬렉션으로 이동하여 유저 정보를 가져온다.
      const userSnapshot = await getDoc(
        doc(collection(store, COLLECTIONS.USER), comment.userId)
      );
      const user = userSnapshot.data() as User;
      //가져온 유저 정보를 userMap에 저장해둔다.
      userMap[comment.userId] = user;

      //결과를 한 곳에 저장한다.
      results.push({
        ...comment,
        user,
      });
    } //2.캐시된 유저가 있다면
    else {
      results.push({
        ...comment,
        user: cashingUser,
      });
    }
  }

  return results;
}

//Comment 작성
export function writeComment(newComment: Omit<Comment, "id">) {
  //*id는 firebase에서 자동으로 생성되므로 Omit으로 id를 제외한다.
  //1.저장할 doc 위치를 지정 moment컬렉션의 momentId doc안의 Like 도큐먼트
  const momentRef = doc(store, COLLECTIONS.MOMENTS, newComment.momentId);
  const likeRef = doc(collection(momentRef, COLLECTIONS.COMMENT));

  //2.promise를 반환
  return setDoc(likeRef, newComment);
}

//Comment 삭제
export function removeComment({
  momentId,
  commentId,
}: {
  momentId: string;
  commentId: string;
}) {
  const momentRef = doc(collection(store, COLLECTIONS.MOMENTS), momentId);
  const commentRef = doc(collection(momentRef, COLLECTIONS.COMMENT), commentId);

  return deleteDoc(commentRef);
}

//Comment 수정
export function updateComment({
  momentId,
  commentId,
  newComment,
}: {
  momentId: string;
  commentId: string;
  newComment: string;
}) {
  const momentRef = doc(collection(store, COLLECTIONS.MOMENTS), momentId);
  const commentRef = doc(collection(momentRef, COLLECTIONS.COMMENT), commentId);

  return updateDoc(commentRef, {
    content: newComment,
  });
}
