import { useCallback } from "react";
import { css } from "@emotion/react";
import useComments from "./hooks/useComments";
import Spacing from "@shared/Spacing";
import CommentBox from "./CommentBox";
import Form from "./Form";
import { Moment } from "@/models/moment";
import Flex from "../shared/Flex";
import Text from "../shared/Text";

function Comment({ moment }: { moment: Moment }) {
  const { data: comments, isLoading } = useComments({ momentId: moment.id });
  if (isLoading) {
  }
  //댓글을 부모로부터 매개변수로 받는다.
  // 1.댓글 유무에 따른 렌더링
  const renderComments = useCallback(() => {
    //댓글이 존재하지 않을 경우
    if (comments?.length === 0) {
      return (
        <Flex justify="center" direction="column" align="center">
          <Spacing size={24} />
          <IconComment />
          <Text typography="t7" color="gray500">
            아직 댓글이 없습니다.
          </Text>
        </Flex>
      );
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

function IconComment() {
  return (
    <svg
      enable-background="new 0 0 512 512"
      height="50px"
      id="Layer_1"
      version="1.1"
      viewBox="0 0 512 512"
      width="50px"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M170.476,166.19h155.097c4.285,0,7.76-3.469,7.76-7.754s-3.475-7.765-7.76-7.765H170.476c-4.285,0-7.754,3.48-7.754,7.765  S166.191,166.19,170.476,166.19z" />
      <path d="M348.088,203.362H202.74c-4.284,0-7.759,3.469-7.759,7.754s3.475,7.765,7.759,7.765h145.348c4.284,0,7.754-3.48,7.754-7.765  S352.372,203.362,348.088,203.362z" />
      <path d="M306.695,256.052H170.476c-4.285,0-7.754,3.469-7.754,7.754c0,4.284,3.469,7.754,7.754,7.754h136.219  c4.279,0,7.754-3.47,7.754-7.754C314.448,259.521,310.974,256.052,306.695,256.052z" />
      <path d="M396.776,86.288H115.225c-29.992,0-54.403,22.562-54.403,50.308v154.83c0,27.735,24.411,50.297,54.403,50.297h166.034  l119.812,83.989v-84.135c27.996-2.038,50.108-23.753,50.108-50.151v-154.83C451.179,108.85,426.768,86.288,396.776,86.288z   M427.906,291.426c0,14.902-13.972,27.025-31.131,27.025h-18.978v62.523l-89.193-62.523h-173.38  c-17.164,0-31.131-12.123-31.131-27.025v-154.83c0-14.913,13.967-27.035,31.131-27.035h281.551  c17.159,0,31.131,12.123,31.131,27.035V291.426z" />
    </svg>
  );
}

const commentContainer = css`
  padding: 8px;
`;

export default Comment;
