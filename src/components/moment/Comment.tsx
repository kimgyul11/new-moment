import { useCallback } from "react";
import { css } from "@emotion/react";
import useComments from "./hooks/useComments";
import Spacing from "@shared/Spacing";
import CommentBox from "./CommentBox";
import Form from "./Form";
import { Moment } from "@/models/moment";

function Comment({ moment }: { moment: Moment }) {
  const { data: comments, isLoading } = useComments({ momentId: moment.id });
  if (isLoading) {
  }
  //댓글을 부모로부터 매개변수로 받는다.
  // 1.댓글 유무에 따른 렌더링
  const renderComments = useCallback(() => {
    //댓글이 존재하지 않을 경우
    if (comments?.length === 0) {
      return null;
    }
    //댓글이 존재할 경우
    return (
      <ul>
        {comments?.map((comment) => (
          <CommentBox comment={comment} momentId={moment.id} key={comment.id} />
        ))}
      </ul>
    );
  }, [comments, moment.id]);

  if (isLoading) {
    return null;
  }

  return (
    <div css={commentContainer}>
      <Form momentId={moment.id} momentAuthor={moment.userId} />
      <Spacing size={24} />
      {renderComments()}
    </div>
  );
}

const commentContainer = css`
  padding: 8px;
`;

export default Comment;
