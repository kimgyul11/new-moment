import useUser from "@/hooks/auth/useUser";
import Flex from "@shared/Flex";
import ListRow from "@shared/ListRow";
import Text from "@shared/Text";
import { css } from "@emotion/react";
import Button from "@shared/Button";
import Spacing from "@shared/Spacing";
import InputBox from "@shared/InputBox";
import { ChangeEvent, useState } from "react";
import useComments from "./hooks/useComments";
import { CommentWithUser } from "@/models/user";
import ProfileImage from "@shared/ProfileImage";

import { format } from "date-fns";
import formatDate from "@/utils/formatTime";

function CommentBox({
  comment,
  momentId,
}: {
  comment: CommentWithUser;
  momentId: string;
}) {
  const user = useUser();
  const [updateMode, setUpdateMode] = useState<{
    commentId: string;
    isUpdate: boolean;
  }>({
    commentId: "",
    isUpdate: false,
  });

  const { update, remove } = useComments({ momentId });

  const [newComment, setNewComment] = useState("");

  const handleNewCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value);
  };

  return (
    <li>
      <Flex direction="column">
        <ListRow
          as="div"
          left={<ProfileImage />}
          contents={
            <ListRow.Texts
              typography="t7"
              title={comment.user.displayName}
              subTitle={formatDate(comment.createdAt)}
            />
          }
          right={
            user != null ? (
              <Flex>
                <Text
                  bold={true}
                  typography="t7"
                  css={cursorPointer}
                  onClick={() => {
                    setUpdateMode({
                      commentId: comment.id,
                      isUpdate: true,
                    });
                    setNewComment(comment.content);
                  }}
                >
                  {updateMode.commentId === comment.id && updateMode.isUpdate
                    ? null
                    : "수정"}
                </Text>
                <Spacing direction="horizontal" size={12} />
                <Text
                  bold={true}
                  typography="t7"
                  color="red"
                  css={cursorPointer}
                  onClick={() => {
                    if (
                      updateMode.commentId === comment.id &&
                      updateMode.isUpdate
                    ) {
                      setUpdateMode({ commentId: "", isUpdate: false });
                      return;
                    }
                    const ok = window.confirm("정말 삭제하시겠습니까?");
                    if (ok) {
                      remove({ momentId, commentId: comment.id });
                    }
                    return;
                  }}
                >
                  {updateMode.commentId === comment.id && updateMode.isUpdate
                    ? "취소"
                    : "삭제"}
                </Text>
              </Flex>
            ) : null
          }
        />
        <Flex css={contentStyles}>
          {updateMode.commentId === comment.id && updateMode.isUpdate ? (
            <Flex direction="column" css={{ width: "100%" }} align="center">
              <InputBox value={newComment} onChange={handleNewCommentChange} />
              <Spacing size={12} />
              <Button
                onClick={() => {
                  update({ momentId, commentId: comment.id, newComment });
                  setUpdateMode((prev) => ({ ...prev, isUpdate: false }));
                }}
                css={{ width: "100%" }}
                weak={true}
              >
                저장
              </Button>
            </Flex>
          ) : (
            <Text typography="t7" color="gray500">
              {comment.content}
            </Text>
          )}
        </Flex>
      </Flex>
    </li>
  );
}

const cursorPointer = css`
  cursor: pointer;
`;
const contentStyles = css`
  padding: 4px 8px;
`;

export default CommentBox;
